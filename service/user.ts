import { useMutation } from "@tanstack/react-query";
import { User } from "../types/user";
import api from "./api";

export const useUpdateUserMutation = () => {
  return useMutation(
    async ({ userId, partialUserInfo }: { userId: string; partialUserInfo: Partial<User> }) =>
      (
        await api.patch<User>(`/api/user/${userId}`, {
          ...partialUserInfo,
        })
      ).data
  );
};
