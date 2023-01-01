import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../public/images/hahaha.png";
import AuthButton from "../ui/auth-button";
import { useLogoutMutation } from "../../service/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import HeaderMenu from "../header-menu";
import { BoardId } from "../../types/board";

type Props = {
  loggedIn: boolean;
  activeLink?: BoardId;
};

const Header = ({ loggedIn, activeLink }: Props) => {
  const { mutate: logout } = useLogoutMutation();
  const router = useRouter();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push("/");
      },
      onError: () => {
        toast.error("로그아웃에 실패하였습니다.");
      },
    });
  };

  return (
    <header className="flex flex-row justify-center bg-lime-600 text-white w-full h-12 drop-shadow-lg sm:h-14">
      <div className="flex flex-row justify-between w-full max-w-7xl">
        <div className="flex flex-row items-center">
          <label htmlFor="my-drawer" className="flex p-3 h-12 cursor-pointer">
            <FontAwesomeIcon icon={faBars} size="5x" className="!box-border w-full h-full" />
          </label>
          <Image
            src={logo}
            alt="main logo"
            className="w-auto h-full p-3 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          />
          <HeaderMenu activeLink={activeLink} className="hidden sm:inline-flex sm:h-full" />
        </div>
        {loggedIn ? (
          <AuthButton onClick={handleLogout} className="sm:mr-4">
            로그아웃
          </AuthButton>
        ) : (
          <AuthButton htmlFor="login-modal" className="sm:mr-4">
            로그인
          </AuthButton>
        )}
      </div>
    </header>
  );
};

export default Header;
