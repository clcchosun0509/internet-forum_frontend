import { useMutation } from "@tanstack/react-query";
import { Post, PostsResponse } from "../types/post";
import api from "./api";
import _ from "lodash";
import { CommentsResponse } from "../types/comment";
import { BoardId } from "../types/board";
import { SearchType } from "../types/search";

export const useWritePostMutation = () => {
  return useMutation(
    async ({ title, content, boardId }: { title: string; content: string; boardId: BoardId }) =>
      (
        await api.post<Post>("/api/post", {
          title,
          content,
          boardId,
        })
      ).data
  );
};

export const getPosts = async (boardId: BoardId, page: number) => {
  return (await api.get<PostsResponse>(`/api/board/${boardId}?page=${page}`)).data;
};

export const getPostsBySearch = async (boardId: BoardId, searchType: SearchType, keyword: string, page: number) => {
  return (
    await api.get<PostsResponse>(`/api/search/${searchType}`, {
      params: {
        query: keyword,
        boardId,
        page,
      },
    })
  ).data;
};

export const getPost = async (postId: number) => {
  return (await api.get<Post>(`/api/post/${postId}`)).data;
};

export const useDeletePostMutation = () => {
  return useMutation(async ({ postId }: { postId: number }) => {
    await api.delete(`/api/post/${postId}`);
  });
};

export const useEditPostMutation = () => {
  return useMutation(
    async ({ title, content, postId }: { title: string; content: string; postId: number }) =>
      (
        await api.patch<Post>(`/api/post/${postId}`, {
          title,
          content,
        })
      ).data
  );
};

export const useLikePostMutation = () => {
  return useMutation(async ({ postId }: { postId: number }) => await api.post("/api/like", { postId }));
};

export const getComments = async (postId: number, page: number) => {
  return (await api.get<CommentsResponse>(`/api/comment?postId=${postId}&page=${page}`)).data;
};

export const useWriteCommentMutation = () => {
  return useMutation(
    async ({ postId, content }: { postId: number; content: string }) =>
      (
        await api.post<Post>("/api/comment", {
          postId,
          content,
        })
      ).data
  );
};

export const useWriteCommentReplyMutation = () => {
  return useMutation(
    async ({ commentId, content }: { commentId: string; content: string }) =>
      (
        await api.post<Post>("/api/comment/reply", {
          commentId,
          content,
        })
      ).data
  );
};
