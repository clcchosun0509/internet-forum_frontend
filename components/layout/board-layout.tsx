import BoardHeader from "../ui/board-header";

type Props = {
  children: React.ReactNode;
  boardId: string;
  boardTitle: string;
  boardDescription: string;
};

const BoardLayout = ({ children, boardId, boardTitle, boardDescription }: Props) => {
  return (
    <div className="flex flex-col mx-4 xl:mx-0">
      <BoardHeader boardId={boardId} boardTitle={boardTitle} boardDescription={boardDescription} />
      {children}
    </div>
  );
};

export default BoardLayout;
