import { GetServerSideProps } from "next";
import BoardWidget from "../components/ui/board-widget";
import { getPosts } from "../service/post";
import { BoardId, boards as boardIds, boardTitle } from "../types/board";
import { Post } from "../types/post";

interface BoardWithPosts {
  boardId: BoardId;
  boardTitle: string;
  posts: Post[];
}

type Props = {
  boardsWithPosts: BoardWithPosts[];
};

const Home = ({ boardsWithPosts }: Props) => {
  const boardWidgetItems = boardsWithPosts.map(({ boardId, boardTitle, posts }) => (
    <BoardWidget boardId={boardId} boardTitle={boardTitle} posts={posts} />
  ));

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-4">{boardWidgetItems}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const boardPromises: Promise<BoardWithPosts>[] = [];
  boardIds.forEach((boardId) => {
    const postsPromise = new Promise<BoardWithPosts>((resolve, reject) => {
      getPosts(boardId, 1)
        .then((postsResponse) => {
          const posts = postsResponse.items.slice(0, 5);
          resolve({
            boardId,
            boardTitle: boardTitle[boardId],
            posts,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
    boardPromises.push(postsPromise);
  });

  const boardsWithPosts = await Promise.all(boardPromises);

  return {
    props: {
      boardsWithPosts,
    },
  };
};

export default Home;
