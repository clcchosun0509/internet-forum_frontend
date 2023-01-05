import { useMutation } from "@tanstack/react-query";
import { clientApi } from "./api";

export const useLogoutMutation = () => {
  return useMutation(() => clientApi.post("/api/auth/logout"));
};
