import { Cookies } from "../../types/cookies";
import DrawerSide from "../drawer-side";
import LoginModal from "../login-modal";
import Footer from "./footer";
import Header from "./header";


type Props = {
  cookies: Cookies;
  children: React.ReactNode;
};

const Layout = ({ cookies, children }: Props) => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Header loggedIn={cookies.logged_in === "true"} />
          <main className="h-[2000px]">{children}</main>
          <Footer />
        </div>
        <DrawerSide cookies={cookies} />
      </div>
      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <LoginModal />
    </>
  );
};

export default Layout;
