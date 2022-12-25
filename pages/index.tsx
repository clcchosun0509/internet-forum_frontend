import { GetServerSideProps } from 'next';

const Home = () => {
  return (
    <h1 className="text-3xl font-bold underline font-notoSans">
      Hello world!
    </h1>
  );
}


export const getServerSideProps:GetServerSideProps = async (ctx) => {
  return {
    props:{
      data:null
    }
  }
}

export default Home;