import Link from "next/link";
import { Board } from "../types/board";
import MenuItem from "./ui/menu-item";

type Props = {
  horizontal?: boolean;
  activeLink?: Board;
};

const MenuItems = ({ horizontal, activeLink }: Props) => {
  return (
    <>
      <MenuItem horizontal={horizontal} active={activeLink === Board.Hahaha} link={Board.Hahaha}>
        하하하
      </MenuItem>
      <MenuItem horizontal={horizontal} active={activeLink === Board.Free} link={Board.Free}>
        자유롭게
      </MenuItem>
      <MenuItem horizontal={horizontal} active={activeLink === Board.Game} link={Board.Game}>
        게임
      </MenuItem>
      <MenuItem horizontal={horizontal} active={activeLink === Board.Hobby} link={Board.Hobby}>
        취미
      </MenuItem>
    </>
  );
};

export default MenuItems;
