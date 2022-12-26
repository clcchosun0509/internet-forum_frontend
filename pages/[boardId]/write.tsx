import { GetServerSideProps } from "next";
import { Board, boardDescription, boardTitle } from "../../types/board";
import { isValidBoard } from "../../utils/utils";

type Props = {
  boardTitle: string;
  boardDescription: string;
};

const PostWrite = ({ boardTitle, boardDescription }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col m-4">
        <h1 className="text-2xl font-bold text-lime-600">{boardTitle}</h1>
        <p className="text-base text-gray-500">{boardDescription}</p>
      </div>
      <input type="text" placeholder="제목" className="input input-bordered m-4 mt-0" />
    </div>
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
  const boardId = boardIdParam as Board;

  return {
    props: {
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
    },
  };
};

export default PostWrite;
