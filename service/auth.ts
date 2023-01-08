import { useMutation } from "@tanstack/react-query";
import { IncomingHttpHeaders } from "http";
import { User } from "../types/user";
import api from "./api";

export const useLogoutMutation = () => {
  return useMutation(() => api.post("/api/auth/logout"));
};

export const getMe = (cookie: IncomingHttpHeaders["cookie"]) => {
  return api
    .get<User>("/api/auth/status", {
      headers: {
        Cookie: cookie,
      },
    })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err?.response?.data);
      return null;
    });
};
