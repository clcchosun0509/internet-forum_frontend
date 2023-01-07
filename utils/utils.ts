import { boards } from "../types/board";
import moment from "moment";
import "moment/locale/ko";

export const isValidBoard = (id: string | string[] | undefined) => {
  if (typeof id === "string" && boards.has(id as any)) {
    return true;
  }
  return false;
};

export const parseParamToIntOrNull = (param: string | string[] | undefined) => {
  if (typeof param !== "string") {
    return null;
  }

  const parsed = parseInt(param);
  if (isNaN(parsed)) {
    return null;
  }

  return parsed;
};

export const getRelativeTime = (date: Date) => {
  return moment(date).locale("ko").fromNow();
}

export const addClassName = (className?: string) => {
  if (className) {
    return " " + className;
  } else {
    return "";
  }
}