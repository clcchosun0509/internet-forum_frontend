import { GetServerSideProps } from "next";
import sanitizeHtml from "sanitize-html";
import BoardLayout from "../../../components/layout/board-layout";
import { getPost, useLikePostMutation } from "../../../service/post";
import { BoardId, boardDescription, boardTitle } from "../../../types/board";
import { isValidBoard, parseParamToIntOrNull } from "../../../utils/utils";
import { Post } from "../../../types/post";
import PostInfoHead from "../../../components/ui/post-info-head";
import PostDropdown from "../../../components/post-dropdown";
import LikeButton from "../../../components/ui/like-button";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  post: Post;
  boardId: BoardId;
  boardTitle: string;
  boardDescription: string;
  isSameUser: boolean;
};

const Post = ({ post, boardId, boardTitle, boardDescription, isSameUser }: Props) => {
  const [likeCount, setLikeCount] = useState<number>(post.likeCount);
  const { mutate: likePost } = useLikePostMutation();

  const handleLikePost = () => {
    likePost(
      { postId: post.id },
      {
        onSuccess: () => {
          setLikeCount((prevLikeCount) => prevLikeCount + 1);
        },
        onError: (err: any) => {
          if (err?.response?.status === 403) {
            toast.error("로그인을 해주세요.");
          } else {
            toast.error(err?.response?.data?.message);
          }
        },
      }
    );
  };

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
    </BoardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params, req } = ctx;

  const boardIdParam = params?.boardId;
  const postId = parseParamToIntOrNull(params?.postId);

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
      boardId,
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
      isSameUser,
    },
  };
};

export default Post;
