import React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppContext, AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "react-toastify/dist/ReactToastify.css";
import { CloseButtonProps, ToastContainer, Zoom } from "react-toastify";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { Cookies } from "../types/cookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type CustomContext = AppContext & {
  ctx: {
    req: { cookies: Cookies };
  };
};

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <div onClick={closeToast} className="flex items-center mr-2">
    <FontAwesomeIcon icon={faXmark} size="2x" />
  </div>
);

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider attribute="class">
          <Layout cookies={pageProps.cookies} boardId={pageProps.boardId}>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer
            position="top-center"
            theme="colored"
            autoClose={3000}
            hideProgressBar
            transition={Zoom}
            pauseOnFocusLoss={false}
            closeButton={CloseButton}
          />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }: CustomContext) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  let cookies: Cookies = ctx?.req?.cookies;
  pageProps = { ...pageProps, cookies, boardId: ctx.query.boardId };

  return { pageProps };
};
