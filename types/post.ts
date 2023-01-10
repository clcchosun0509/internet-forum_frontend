import { BoardId } from "./board";
import { PaginationMeta } from "./common";
import { User } from "./user";

export interface Post {
  id: number;
  title: string;
  authorId: string;
  author: User;
  content: string;
  boardId: BoardId;
  viewCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface PostsResponse {
  items: Post[];
  meta: PaginationMeta;
}
