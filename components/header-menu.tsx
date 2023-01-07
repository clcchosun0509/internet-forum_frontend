import { BoardId } from "../types/board";
import { addClassName } from "../utils/utils";
import MenuItems from "./menu-items";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  className?: string;
  activeLink?: BoardId;
};

const HeaderMenu = ({ className, activeLink }: Props) => {
  return (
    <ul className={`menu menu-horizontal text-lime-100${addClassName(className)}`}>
      <MenuItems horizontal activeLink={activeLink} />
    </ul>
  );
};

export default HeaderMenu;
