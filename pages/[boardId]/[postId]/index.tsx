import { GetServerSideProps } from "next";
import sanitizeHtml from "sanitize-html";
import BoardLayout from "../../../components/layout/board-layout";
import { getComments, getPost, useLikePostMutation, useWriteCommentMutation } from "../../../service/post";
import { BoardId, boardDescription, boardTitle } from "../../../types/board";
import { isValidBoard, parseParamToIntOrNull } from "../../../utils/utils";
import { Post } from "../../../types/post";
import PostInfoHead from "../../../components/ui/post-info-head";
import PostDropdown from "../../../components/post-dropdown";
import LikeButton from "../../../components/ui/like-button";
import { useState } from "react";
import { toast } from "react-toastify";
import CommentTextarea from "../../../components/comment-textarea";
import CommentInfoHead from "../../../components/ui/comment-info-head";
import CommentButton from "../../../components/ui/comment-button";
import { useRouter } from "next/router";
import { CommentsResponse } from "../../../types/comment";
import Comment from "../../../components/comment";
import Pagination from "../../../components/pagination";

type Props = {
  post: Post;
  comments: CommentsResponse;
  boardId: BoardId;
  boardTitle: string;
  boardDescription: string;
  isSameUser: boolean;
};

const Post = ({ post, comments, boardId, boardTitle, boardDescription, isSameUser }: Props) => {
  const [likeCount, setLikeCount] = useState<number>(post.likeCount);
  const [comment, setComment] = useState<string>("");
  const { mutate: likePost } = useLikePostMutation();
  const { mutate: writeComment } = useWriteCommentMutation();
  const router = useRouter();

  const handleLikePost = () => {
    likePost(
      { postId: post.id },
      {
        onSuccess: () => {
          setLikeCount((prevLikeCount) => prevLikeCount + 1);
        },
        onError: (err: any) => {
          if (err?.response?.status === 403) {
            toast.error("로그인을 해주세요");
          } else {
            toast.error(err?.response?.data?.message);
          }
        },
      }
    );
  };

  const handleWriteComment = () => {
    writeComment(
      { postId: post.id, content: comment },
      {
        onSuccess: () => {
          setComment("");
          router.replace(`/${boardId}/${post.id}`);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message);
        },
      }
    );
  };

  const handlePagination = (page: number, isSamePage: boolean) => {
    if (!isSamePage) {
      router.push(`/${boardId}/${post.id}?page=${page}`);
    }
  };

  const commentItems = comments.items.map((comment) => {
    return <Comment key={comment.id} comment={comment} boardId={boardId} postId={post.id} />;
  });

  return (
    <BoardLayout boardId={boardId} boardTitle={boardTitle} boardDescription={boardDescription}>
      <h1 className="font-bold text-2xl text-black dark:text-white mb-3">{post.title}</h1>
      <div className="flex flex-row items-center justify-between text-gray-500 text-sm sm:text-base">
        <PostInfoHead post={post} />
        {isSameUser && <PostDropdown postId={post.id} boardId={boardId} />}
      </div>
      <div className="divider" />
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(post.content, { allowedTags: false, allowedAttributes: false }),
        }}
      />
      <div className="flex justify-center mt-4">
        <LikeButton likeCount={likeCount} onClick={handleLikePost} />
      </div>
      <div className="divider" />
      <div className="flex flex-col">
        <CommentInfoHead />
        <div className="flex flex-col">{commentItems}</div>
        <Pagination className="mt-2 mb-10" meta={comments.meta} onClickPagination={handlePagination} />
        <CommentTextarea className="mb-2" content={comment} setContent={setComment} />
        <CommentButton onClick={handleWriteComment} />
      </div>
    </BoardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params, query, req } = ctx;

  const boardIdParam = params?.boardId;
  const postId = parseParamToIntOrNull(params?.postId);
  const commentPage = parseParamToIntOrNull(query.page) || 1;

  if (!isValidBoard(boardIdParam) || !postId) {
    return {
      notFound: true,
    };
  }
  const boardId = boardIdParam as BoardId;

  const post = await getPost(postId);
  if (!post) {
    return {
      notFound: true,
    };
  }

  const comments = await getComments(postId, commentPage);

  let isSameUser = true;
  if (req.cookies.logged_in !== "true") {
    isSameUser = false;
  }
  if (req.cookies.username !== post.author.username) {
    isSameUser = false;
  }

  return {
    props: {
      post,
      comments,
      boardId,
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
      isSameUser,
    },
  };
};

export default Post;
