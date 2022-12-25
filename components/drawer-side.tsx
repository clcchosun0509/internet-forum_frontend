import { Board } from "../types/board";
import { Cookies } from "../types/cookies";
import MenuItems from "./menu-items";
import ProfileCard from "./ui/profile-card";

type Props = {
  cookies: Cookies;
  activeLink?: Board;
};
const DrawerSide = ({ cookies, activeLink }: Props) => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="bg-base-100 flex flex-col w-72 text-base-content">
        <ProfileCard cookies={cookies} />
        <ul className="menu p-4">
          <MenuItems activeLink={activeLink} />
        </ul>
      </div>
    </div>
  );
};

export default DrawerSide;
