import { PaginationMeta } from "./common";
import { User } from "./user";

export interface Comment {
  id: string;
  content: string;
  postId: number;
  authorId: string;
  author: User;
  parentCommentId: string | null;
  parentCommentUsername: string | null;
  parentComment: Comment;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CommentsResponse {
  items: Comment[];
  meta: PaginationMeta;
}
