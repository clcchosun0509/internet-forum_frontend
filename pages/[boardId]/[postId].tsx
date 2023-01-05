import { GetServerSideProps } from "next";
import sanitizeHtml from "sanitize-html";
import BoardLayout from "../../components/layout/board-layout";
import { getPost } from "../../service/post";
import { BoardId, boardDescription, boardTitle } from "../../types/board";
import { getRelativeTime, isValidBoard, parseParamToIntOrNull } from "../../utils/utils";
import Image from "next/image";
import ViewCount from "../../components/ui/view-count";
import { Post } from "../../types/post";

type Props = {
  post: Post;
  boardId: BoardId;
  boardTitle: string;
  boardDescription: string;
};

const Post = ({ post, boardId, boardTitle, boardDescription }: Props) => {
  return (
    <BoardLayout boardId={boardId} boardTitle={boardTitle} boardDescription={boardDescription}>
      <h1 className="font-bold text-2xl text-black dark:text-white mb-3">{post.title}</h1>
      <div className="flex flex-row items-center text-gray-500 text-sm sm:text-base">
        <Image
          className="w-6 h-6 mr-2 rounded-full sm:w-8 sm:h-8"
          src={post.author.avatar}
          width={32}
          height={32}
          alt="user avatar"
        />
        <p className="mr-3">{post.author.username}</p>
        <p className="mr-3">{getRelativeTime(post.createdAt)}</p>
        <ViewCount viewCount={post.viewCount} />
      </div>
      <div className="divider" />
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(post.content, { allowedTags: false, allowedAttributes: false }),
        }}
      />
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

  const post = await getPost(postId);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      boardId,
      boardTitle: boardTitle[boardId],
      boardDescription: boardDescription[boardId],
    },
  };
};

export default Post;
