import { GetServerSideProps } from "next";
import { isValidBoard, parseParamToIntOrNull } from "../../utils/utils";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getPosts, useGetPostsQuery } from "../../service/post";
import { BoardId, boardDescription, boardTitle } from "../../types/board";
import BoardLayout from "../../components/layout/board-layout";
import PostItem from "../../components/ui/post-item";
import Button from "../../components/ui/button";

type Props = {
  boardId: BoardId;
  page: number;
  boardTitle: string;
  boardDescription: string;
};

const Board = ({ boardId, page, boardTitle, boardDescription }: Props) => {
  const router = useRouter();
  const { data, isLoading } = useGetPostsQuery(boardId, page);

  if (isLoading || !data) {
    return <h1>로딩중...</h1>;
  }

  const handlePostItemClick = (postId: number) => {
    router.push(`/${boardId}/${postId}`);
  };

  const handleWritePost = () => {
    router.push(`/${boardId}/write`);
  };

  const posts = data.items.map((post) => {
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
      <div>{posts}</div>
      <Button onClick={handleWritePost}>글쓰기</Button>
    </BoardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params, query } = ctx;

  const boardIdParam = params?.boardId;
  const page = parseParamToIntOrNull(query.page) || 1;

  if (!isValidBoard(boardIdParam)) {
    return {
      notFound: true,
    };
  }

  const boardId = boardIdParam as BoardId;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["board", boardId, page], () => getPosts(boardId, page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      boardId,
      page,
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
    },
  };
};

export default Board;
