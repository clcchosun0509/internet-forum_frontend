import { Cookies } from "../types/cookies";
import ProfileCard from "./ui/profile-card";

type Props = {
  cookies: Cookies;
};
const DrawerSide = ({ cookies }: Props) => {
  console.log("cookies", cookies);

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="bg-base-100 flex flex-col w-72 text-base-content">
        <ProfileCard cookies={cookies} />
        <ul className="menu p-4">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DrawerSide;
