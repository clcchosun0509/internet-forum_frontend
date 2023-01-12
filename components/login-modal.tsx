import Image from "next/image";
import hahahaLogo from "../public/images/hahaha.png";
import naverLogo from "../public/images/naver-icon.png";
import githubLogo from "../public/images/github-icon.png";

const LoginModal = () => {
  return (
    <label htmlFor="login-modal" className="modal cursor-pointer">
      <label htmlFor="" className="flex flex-col modal-box w-full mx-4 max-w-[400px] items-center">
        <div className="flex flex-col w-max">
          <Image
            src={hahahaLogo}
            alt="main logo"
            className="w-36 bg-lime-400 dark:bg-transparent rounded-lg p-2 mb-2"
          />
          <p className="text-lime-600 dark:text-lime-300">순수한 웃음을 만들어내는 커뮤니티</p>
        </div>
        <div className="divider" />
        <button
          className="flex flex-row items-center bg-naver text-white p-3 py-2 pr-6 rounded-lg font-bold mb-2"
          onClick={() => {
            window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/naver`, "_self");
          }}
        >
          <Image src={naverLogo} alt="naver logo" className="w-10 h-10" />
          네이버로 로그인하기
        </button>
        <button
          className="flex flex-row items-center bg-github text-white p-3 py-2 pr-6 rounded-lg font-bold"
          onClick={() => {
            window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/github`, "_self");
          }}
        >
          <div className="flex justify-center items-center w-10 h-10">
            <Image src={githubLogo} alt="github logo" className="w-6 h-6" />
          </div>
          깃허브로 로그인하기
        </button>
        <div className="divider" />
        <div className="modal-action">
          <label htmlFor="login-modal" className="text-lime-600 dark:text-lime-300 font-extrabold cursor-pointer">
            닫기
          </label>
        </div>
      </label>
    </label>
  );
};

export default LoginModal;
