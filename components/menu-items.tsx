import { ReactNode } from "react";
import { BoardId, boardTitle, boards } from "../types/board";
import MenuItem from "./ui/menu-item";

type Props = {
  horizontal?: boolean;
  activeLink?: BoardId;
};

const MenuItems = ({ horizontal, activeLink }: Props) => {
  const menuItems = () => {
    const result: ReactNode[] = [];
    boards.forEach((board) => {
      result.push(
        <MenuItem key={board} horizontal={horizontal} active={activeLink === board} link={board}>
          {boardTitle[board]}
        </MenuItem>
      );
    });
    return result;
  };

  return (
    <>
      {menuItems()}
    </>
  );
};

export default MenuItems;
