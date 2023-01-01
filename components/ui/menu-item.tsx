import Link from "next/link";
import { BoardId } from "../../types/board";

type Props = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  className?: string;
  horizontal?: boolean;
  active?: boolean;
  link: BoardId;
  children: React.ReactNode | string;
};

const MenuItem = ({ className, horizontal, active, link, children }: Props) => {
  return (
    <li className={horizontal && active ? `border-b-2 border-white pt-[2px] text-white ${className}` : className}>
      <Link
        href={`/${link}`}
        className={!horizontal && active ? "active" : ""}
        onClick={() => {
          if (!horizontal) {
            document.getElementById("my-drawer")?.click();
          }
        }}
      >
        {children}
      </Link>
    </li>
  );
};

export default MenuItem;
