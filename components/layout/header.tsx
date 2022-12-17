import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../public/images/hahaha.png";
import Button from "../ui/button";
import { useLogoutMutation } from "../../service/auth";
import Router, { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

type Props = {
  loggedIn: boolean;
};

const Header = ({ loggedIn }: Props) => {
  const { mutate: logout } = useLogoutMutation();
  const [, , removeCookie] = useCookies();
  const router = useRouter();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        removeCookie("logged_in");
        removeCookie("email");
        removeCookie("username");
        removeCookie("avatar");
        router.push("/");
      },
      onError: () => {
        toast.error("로그아웃에 실패하였습니다.");
      },
    });
  };

  return (
    <header className="flex flex-row justify-between bg-lime-600 text-white w-full h-12 drop-shadow-lg">
      <div className="flex flex-row items-center">
        <label htmlFor="my-drawer" className="flex p-3 h-12">
          <FontAwesomeIcon icon={faBars} size="5x" className="!box-border w-full h-full" />
        </label>
        <Image src={logo} alt="main logo" className="w-auto h-full p-3" />
      </div>
      {loggedIn ? <Button onClick={handleLogout}>로그아웃</Button> : <Button htmlFor="login-modal">로그인</Button>}
    </header>
  );
};

export default Header;
