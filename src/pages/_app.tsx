import { ClerkProvider } from "@clerk/nextjs";
import { AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { Header } from "~/components/Header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider>
      <Head>
        <title>Tweet Clone</title>
        <meta name="description" content="This is a tweet clone by aahwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <Header />
        <div className="min-h-screen flex-grow">
          <Component {...pageProps} />
        </div>
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
