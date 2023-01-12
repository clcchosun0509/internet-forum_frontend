import { BoardId } from "../../types/board";
import { Cookies } from "../../types/cookies";
import { isValidBoard } from "../../utils/utils";
import DrawerSide from "../drawer-side";
import LoginModal from "../login-modal";
import Footer from "./footer";
import Header from "./header";


type Props = {
  cookies: Cookies;
  children: React.ReactNode;
  boardId: string | string[] | undefined;
};


const Layout = ({ cookies, children, boardId }: Props) => {
  let activeLink:BoardId | undefined = undefined;
  if (isValidBoard(boardId)) {
    activeLink = boardId as BoardId;
  }

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center">
          <Header loggedIn={cookies.logged_in === "true"} activeLink={activeLink} />
          <main className="h-[2000px] w-full max-w-7xl flex flex-col">{children}</main>
          <Footer />
        </div>
        <DrawerSide cookies={cookies} activeLink={activeLink} />
      </div>
      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <LoginModal />
    </>
  );
};

export default Layout;
