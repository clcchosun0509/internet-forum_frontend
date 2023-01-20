import { useRouter } from "next/router";
import { BoardId } from "../../types/board";
import { Post } from "../../types/post";

type Props = {
  boardId: BoardId;
  boardTitle: string;
  posts: Post[];
};

const BoardWidget = ({ boardId, boardTitle, posts }: Props) => {
  const router = useRouter();

  const postItems = posts.map((post) => (
    <div className="flex flex-col cursor-pointer" onClick={() => router.push(`/${boardId}/${post.id}`)}>
      <div className="flex flex-row text-sm">
        <p className="text-black dark:text-white truncate">{post.title}</p>
      </div>
      <div className="divider my-0" />
    </div>
  ));
  return (
    <div key={`board-${boardTitle}`} className="flex flex-col mx-2 xl:mx-0">
      <h1 className="text-2xl font-bold text-lime-600 cursor-pointer mb-2" onClick={() => router.push(`/${boardId}`)}>
        {boardTitle}
      </h1>
      <div className="flex flex-col">{postItems}</div>
    </div>
  );
};

export default BoardWidget;
