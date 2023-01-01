import { useRouter } from "next/router";

type Props = {
  boardId: string;
  boardTitle: string;
  boardDescription: string;
};

const BoardHeader = ({ boardId, boardTitle, boardDescription }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col my-4">
      <h1
        className="text-2xl font-bold text-lime-600 cursor-pointer"
        onClick={() => {
          router.push(`/${boardId}`);
        }}
      >
        {boardTitle}
      </h1>
      <p className="text-base text-gray-500">{boardDescription}</p>
    </div>
  );
};

export default BoardHeader;
