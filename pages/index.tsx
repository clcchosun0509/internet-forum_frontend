import { GetServerSideProps } from "next";
import api from "../service/api";

const Home = () => {
  return (
    <h1 className="text-3xl font-bold underline font-notoSans">
      <button
        onClick={async () => {
          const data = await api.get("/api/auth/status");
          console.log("status", data.data);
        }}
      >
        테스트
      </button>
    </h1>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  };
};

export default Home;
