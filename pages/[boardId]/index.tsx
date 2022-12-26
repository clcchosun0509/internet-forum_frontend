import { GetServerSideProps } from "next";
import { isValidBoard } from "../../utils/utils";


const Board = () => {
  return <div>Enter</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
