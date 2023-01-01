import { useMutation, useQuery } from "@tanstack/react-query";
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
          boardId: boardId,
        })
      ).data
  );
};

export const getPosts = async (boardId: string, page: number) => {
  return (await api.get<PostsResponse>(`/api/board/${boardId}?page=${page}`)).data;
};

export const useGetPostsQuery = (boardId: string, page: number) => {
  return useQuery(["board", boardId, page], () => getPosts(boardId, page));
};

export const getPost = async (postId: number) => {
  return (await api.get<Post>(`/api/post/${postId}`)).data;
};

export const useGetPostQuery = (postId: number) => {
  return useQuery(["post", postId], () => getPost(postId), {enabled: false});
};
