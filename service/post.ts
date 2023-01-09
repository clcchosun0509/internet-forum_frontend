import { useMutation } from "@tanstack/react-query";
import { Post, PostsResponse } from "../types/post";
import api from "./api";
import _ from "lodash";

export const useWritePostMutation = () => {
  return useMutation(
    async ({ title, content, boardId }: { title: string; content: string; boardId: string }) =>
      (
        await api.post<Post>("/api/post", {
          title,
          content,
          boardId,
        })
      ).data
  );
};

export const getPosts = async (boardId: string, page: number) => {
  return (await api.get<PostsResponse>(`/api/board/${boardId}?page=${page}`)).data;
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
