import { GetServerSideProps } from "next";
import { isValidBoard, isValidSearchType, parseParamToIntOrNull, parseParamToString } from "../../utils/utils";
import { useRouter } from "next/router";
import { getPosts, getPostsBySearch } from "../../service/post";
import { BoardId, boardDescription, boardTitle } from "../../types/board";
import BoardLayout from "../../components/layout/board-layout";
import PostItem from "../../components/ui/post-item";
import Button from "../../components/ui/button";
import { PostsResponse } from "../../types/post";
import Pagination from "../../components/pagination";
import SearchGroup from "../../components/search-group";
import { SearchType } from "../../types/search";

type Props = {
  posts: PostsResponse;
  boardId: BoardId;
  boardTitle: string;
  boardDescription: string;
  loggedIn: boolean;
  searchType: SearchType | null;
  keyword: string;
};

const Board = ({ posts, boardId, boardTitle, boardDescription, loggedIn, searchType, keyword }: Props) => {
  const router = useRouter();

  const handlePostItemClick = (postId: number) => {
    router.push(`/${boardId}/${postId}`);
  };

  const handleWritePost = () => {
    router.push(`/${boardId}/write`);
  };

  const handlePagination = (page: number, isSamePage: boolean) => {
    if (isSamePage) {
      return;
    }

    if (searchType) {
      router.push({
        pathname: `/${boardId}`,
        query: { searchType, keyword, page },
      });
      return;
    }

    router.push(`/${boardId}?page=${page}`);
  };

  const handleSearch = (searchType: SearchType, keyword: string) => {
    if (keyword.length >= 1) {
      router.push({
        pathname: `/${boardId}`,
        query: { searchType, keyword },
      });
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
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="hidden md:flex md:flex-1" />
        <SearchGroup className="mb-4" onClickSearch={handleSearch} />
        <div className="flex md:flex-1 md:justify-end">
          {loggedIn && (
            <Button className="w-full md:w-auto" onClick={handleWritePost}>
              글쓰기
            </Button>
          )}
        </div>
      </div>
    </BoardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params, query, req } = ctx;

  const boardIdParam = params?.boardId;
  if (!isValidBoard(boardIdParam)) {
    return {
      notFound: true,
    };
  }

  let searchType: SearchType | null = null;
  if (isValidSearchType(query.searchType)) {
    searchType = query.searchType as SearchType;
  }

  const page = parseParamToIntOrNull(query.page) || 1;
  const boardId = boardIdParam as BoardId;
  const keyword = parseParamToString(query.keyword);
  let posts: PostsResponse;

  if (searchType && keyword.length >= 1) {
    posts = await getPostsBySearch(boardId, searchType, keyword, page);
  } else {
    posts = await getPosts(boardId, page);
  }

  return {
    props: {
      posts,
      boardId,
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
      loggedIn: req.cookies.logged_in === "true",
      searchType,
      keyword,
    },
  };
};

export default Board;
