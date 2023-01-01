import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useWritePostMutation } from "../../service/post";
import { BoardId, boardDescription, boardTitle } from "../../types/board";
import { isValidBoard } from "../../utils/utils";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import BoardLayout from "../../components/layout/board-layout";
import Button from "../../components/ui/button";

const WysiwygEditor = dynamic(() => import("../../components/wysiwyg-editor"), { ssr: false });

type Props = {
  boardId: BoardId;
  boardTitle: string;
  boardDescription: string;
};

const PostWrite = ({ boardId, boardTitle, boardDescription }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const { mutate: writePost } = useWritePostMutation();
  const router = useRouter();

  const handleWritePost = () => {
    writePost(
      { title, content: html, boardId },
      {
        onSuccess: (post) => {
          router.push(`/${boardId}/${post.id}`);
        },
        onError: () => {
          toast.error("글 작성에 실패하였습니다.");
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
      <Button onClick={handleWritePost}>등록</Button>
    </BoardLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { params } = ctx;

  const boardIdParam = params?.boardId;

  if (!isValidBoard(boardIdParam)) {
    return {
      notFound: true,
    };
  }
  const boardId = boardIdParam as BoardId;

  return {
    props: {
      boardId,
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
    },
  };
};

export default PostWrite;
