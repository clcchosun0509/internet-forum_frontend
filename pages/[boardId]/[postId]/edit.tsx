import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { getPost, useEditPostMutation, useWritePostMutation } from "../../../service/post";
import { BoardId, boardDescription, boardTitle } from "../../../types/board";
import { isValidBoard, parseParamToIntOrNull } from "../../../utils/utils";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import BoardLayout from "../../../components/layout/board-layout";
import Button from "../../../components/ui/button";
import { Post } from "../../../types/post";
import { getMe } from "../../../service/auth";

const WysiwygEditor = dynamic(() => import("../../../components/wysiwyg-editor"), { ssr: false });

type Props = {
  post: Post;
  boardId: BoardId;
  boardTitle: string;
  boardDescription: string;
};

const PostEdit = ({ post, boardId, boardTitle, boardDescription }: Props) => {
  const [title, setTitle] = useState<string>(post.title);
  const [html, setHtml] = useState<string>(post.content);
  const { mutate: editPost } = useEditPostMutation();
  const router = useRouter();

  const handleEditPost = () => {
    editPost(
      { title, content: html, postId: post.id },
      {
        onSuccess: (post) => {
          router.push(`/${boardId}/${post.id}`);
        },
        onError: () => {
          toast.error("글 수정에 실패하였습니다.");
        },
      }
    );
  };

  return (
    <BoardLayout boardId={boardId} boardTitle={boardTitle} boardDescription={boardDescription}>
      <input
        type="text"
        placeholder="제목"
        className="input input-bordered mt-0 mb-6 border-[#ccc]/100 transition-none"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <WysiwygEditor className="mb-6" html={html} setHtml={setHtml} />
      <Button onClick={handleEditPost}>등록</Button>
    </BoardLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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

  const me = await getMe(req.headers.cookie);
  if (me?.id !== post.authorId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      boardId,
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
    },
  };
};

export default PostEdit;
