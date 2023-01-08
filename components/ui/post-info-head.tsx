import Image from "next/image";
import { Post } from "../../types/post";
import { getRelativeTime } from "../../utils/utils";
import ViewCount from "./view-count";

type Props = {
  post: Post;
};

const PostInfoHead = ({ post }: Props) => {
  return (
    <div className="flex flex-row items-center">
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
  );
};

export default PostInfoHead;
