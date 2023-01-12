import { Cookies } from "../../types/cookies";
import userIcon from "../../public/images/user-icon.svg";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  cookies: Cookies;
};
const ProfileCard = ({ cookies }: Props) => {
  const router = useRouter();

  let avatarImageSrc: StaticImageData | string = userIcon;
  let username = "게스트";
  let email = "로그아웃 상태입니다";
  if (cookies.logged_in) {
    if (cookies.avatar) {
      avatarImageSrc = cookies.avatar;
    }
    if (cookies.username) {
      username = cookies.username;
    }
    if (cookies.email) {
      email = cookies.email;
    }
  }

  return (
    <div
      className="flex flex-row bg-lime-600 p-4 items-center cursor-pointer"
      onClick={() => {
        router.push("/profile");
        document.getElementById("my-drawer")?.click();
      }}
    >
      <Image className="w-10 h-10 mr-3 rounded-full" src={avatarImageSrc} width={40} height={40} alt="user avatar" />
      <div className="flex flex-col font-light">
        <p className="text-white">{username}</p>
        <p className="text-lime-300 text-sm">{email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
