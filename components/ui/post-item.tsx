import { getRelativeTime } from "../../utils/utils";
import ViewCount from "./view-count";

type Props = {
  title: string;
  authorName: string;
  createdAt: Date;
  viewCount: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const PostItem = ({ title, authorName, createdAt, viewCount, onClick }: Props) => {
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      <div className="flex flex-row mb-1">
        <h1 className="text-black dark:text-white truncate">{title}</h1>
      </div>
      <div className="flex flex-row text-xs text-gray-500">
        <p className="mr-3">{authorName}</p>
        <p className="mr-3">{getRelativeTime(createdAt)}</p>
        <ViewCount viewCount={viewCount} />
      </div>
      <div className="divider my-1" />
    </div>
  );
};

export default PostItem;
