import { GetServerSideProps } from "next";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import { getMe } from "../service/auth";
import { useUpdateUserMutation } from "../service/user";
import { User } from "../types/user";
import Cookies from "js-cookie";

type Props = {
  me: User;
};

const Profile = ({ me }: Props) => {
  const [username, setUsername] = useState<string>(me.username);
  const { mutate: updateUser } = useUpdateUserMutation();

  const handleUpdateUser = () => {
    const partialUserInfo: Partial<User> = {};
    if (username !== me.username) {
      partialUserInfo.username = username;
    }

    updateUser(
      { userId: me.id, partialUserInfo },
      {
        onSuccess: () => {
          Cookies.set("username", username);
          toast.info("회원 정보를 변경하였습니다.");
        },
        onError: (err: any) => {
          const errorMessage = err?.response?.data?.message;
          console.log(errorMessage);
          if (typeof errorMessage === "object") {
            toast.error(err?.response?.data?.message[0]);
          } else {
            toast.error(err?.response?.data?.message);
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col px-2 w-full max-w-[400px] self-center">
      <h1 className="text-xl mt-4 mb-6">회원 정보 변경</h1>
      <p className="mb-2">이메일</p>
      <Input className="mb-4" placeholder="이메일" disabled value={me.email} />
      <p className="mb-2">닉네임</p>
      <Input
        className="mb-6"
        placeholder="닉네임"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Button onClick={handleUpdateUser}>정보 수정</Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;

  const me = await getMe(req.headers.cookie);
  if (!me) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {
      me,
    },
  };
};

export default Profile;
