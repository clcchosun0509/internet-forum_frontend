import { Board } from "../types/board";
import MenuItems from "./menu-items";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  className?: string;
  activeLink?: Board;
};

const HeaderMenu = ({ className, activeLink }: Props) => {
  return (
    <ul className={`menu menu-horizontal text-lime-100 ${className}`}>
      <MenuItems horizontal activeLink={activeLink} />
    </ul>
  );
};

export default HeaderMenu;
