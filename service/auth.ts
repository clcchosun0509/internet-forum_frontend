import { useMutation } from "@tanstack/react-query";
import api from "./api";

export const useLogoutMutation = () => {
  return useMutation(() => api.post("/api/auth/logout"));
};
