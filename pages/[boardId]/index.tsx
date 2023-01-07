import { GetServerSideProps } from "next";
import { isValidBoard, parseParamToIntOrNull } from "../../utils/utils";
import { useRouter } from "next/router";
import { getPosts } from "../../service/post";
import { BoardId, boardDescription, boardTitle } from "../../types/board";
import BoardLayout from "../../components/layout/board-layout";
import PostItem from "../../components/ui/post-item";
import Button from "../../components/ui/button";
import { PostsResponse } from "../../types/post";
import Pagination from "../../components/pagination";

type Props = {
  posts: PostsResponse;
  boardId: BoardId;
  boardTitle: string;
  boardDescription: string;
  loggedIn: boolean;
};

const Board = ({ posts, boardId, boardTitle, boardDescription, loggedIn }: Props) => {
  const router = useRouter();

  const handlePostItemClick = (postId: number) => {
    router.push(`/${boardId}/${postId}`);
  };

  const handleWritePost = () => {
    router.push(`/${boardId}/write`);
  };

  const handlePagination = (page: number, isSamePage: boolean) => {
    if (!isSamePage) {
      router.push(`/${boardId}?page=${page}`);
    }
  };

  const postItems = posts.items.map((post) => {
    return (
      <PostItem
        key={post.id}
        title={post.title}
        authorName={post.author.username}
        createdAt={post.createdAt}
        viewCount={post.viewCount}
        onClick={() => handlePostItemClick(post.id)}
      />
    );
  });

  return (
    <BoardLayout boardId={boardId} boardTitle={boardTitle} boardDescription={boardDescription}>
      <div>{postItems}</div>
      <Pagination className="mt-2 mb-10" meta={posts.meta} onClickPagination={handlePagination} />
      {loggedIn && <Button onClick={handleWritePost}>글쓰기</Button>}
    </BoardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    params,
    query,
    req,
  } = ctx;

  const boardIdParam = params?.boardId;
  const page = parseParamToIntOrNull(query.page) || 1;

  if (!isValidBoard(boardIdParam)) {
    return {
      notFound: true,
    };
  }

  const boardId = boardIdParam as BoardId;

  const posts = await getPosts(boardId, page);

  return {
    props: {
      posts,
      boardId,
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
      loggedIn: req.cookies.logged_in === "true",
    },
  };
};

export default Board;
