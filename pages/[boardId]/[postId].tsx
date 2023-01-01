import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import sanitizeHtml from "sanitize-html";
import BoardLayout from "../../components/layout/board-layout";
import { getPost, useGetPostQuery } from "../../service/post";
import { BoardId, boardDescription, boardTitle } from "../../types/board";
import { getRelativeTime, isValidBoard, parseParamToIntOrNull } from "../../utils/utils";
import Image from "next/image";
import ViewCount from "../../components/ui/view-count";

type Props = {
  boardId: BoardId;
  boardTitle: string;
  boardDescription: string;
  postId: number;
};

const Post = ({ boardId, boardTitle, boardDescription, postId }: Props) => {
  const { data } = useGetPostQuery(postId);
  const router = useRouter();

  if (!data) {
    return <h1>로딩중...</h1>;
  }

  return (
    <BoardLayout boardId={boardId} boardTitle={boardTitle} boardDescription={boardDescription}>
      <h1 className="font-bold text-2xl text-black dark:text-white mb-3">{data.title}</h1>
      <div className="flex flex-row items-center text-gray-500 text-sm sm:text-base">
        <Image
          className="w-6 h-6 mr-2 rounded-full sm:w-8 sm:h-8"
          src={data.author.avatar}
          width={32}
          height={32}
          alt="user avatar"
        />
        <p className="mr-3">{data.author.username}</p>
        <p className="mr-3">{getRelativeTime(data.createdAt)}</p>
        <ViewCount viewCount={data.viewCount} />
      </div>
      <div className="divider" />
      <div dangerouslySetInnerHTML={{__html: sanitizeHtml(data.content, {allowedTags: false, allowedAttributes: false})}}/>
    </BoardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;

  const boardIdParam = params?.boardId;
  const postId = parseParamToIntOrNull(params?.postId);

  if (!isValidBoard(boardIdParam) || !postId) {
    return {
      notFound: true,
    };
  }
  const boardId = boardIdParam as BoardId;

  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery(["post", postId], () => getPost(postId), {staleTime: 2000, cacheTime: 2000});
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      boardId,
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
      postId,
    },
  };
};

export default Post;
