import { GetServerSideProps } from "next";
import { boards } from "../types/board";

const Board = () => {
  return <div>Enter</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isValidBoard = (id: string | string[] | undefined) => {
    if (typeof id === "string" && boards.has(id)) {
      return true;
    }
    return false;
  };

  const { params } = ctx;

  const boardId = params?.boardId;

  if (!isValidBoard(boardId)) {
    return {
      notFound: true,
    };
  }

  console.log("boardId", boardId);

  return {
    props: {
      data: null,
    },
  };
};

export default Board;
