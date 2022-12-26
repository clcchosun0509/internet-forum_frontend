import { boards } from "../types/board";

export const isValidBoard = (id: string | string[] | undefined) => {
  if (typeof id === "string" && boards.has(id as any)) {
    return true;
  }
  return false;
};