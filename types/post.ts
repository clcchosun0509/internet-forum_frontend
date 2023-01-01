import { BoardId } from "./board";
import { User } from "./user";

export interface Post {
  id: number;
  title: string;
  authorId: string;
  author: User;
  content: string;
  boardId: BoardId;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface PostsResponse {
  items: Post[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
