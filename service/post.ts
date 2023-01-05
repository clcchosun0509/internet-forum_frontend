import { useMutation, useQuery } from "@tanstack/react-query";
import { Post, PostsResponse } from "../types/post";
import {serverApi, clientApi} from "./api";
import _ from "lodash";

export const useWritePostMutation = () => {
  return useMutation(
    async ({ title, content, boardId }: { title: string; content: string; boardId: string }) =>
      (
        await clientApi.post<Post>("/api/post", {
          title,
          content,
          boardId: boardId,
        })
      ).data
  );
};

export const getPosts = async (boardId: string, page: number) => {
  return (await serverApi.get<PostsResponse>(`/api/board/${boardId}?page=${page}`)).data;
};

export const getPost = async (postId: number) => {
  return (await serverApi.get<Post>(`/api/post/${postId}`)).data;
};