import Head from "next/head";
import { api } from "~/utils/api";
import { UploadButton } from "~/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  const createImage = api.image.create.useMutation({
    onSuccess: (image) => {
      console.log(`Successed! Image is now store at: ${image.url}`);
    },
  });
  // const test = api.image.test.useQuery({ url: "Hi" }).data?.greeting;
  function handleUpload(url: string) {
    console.log(`Passing image url from client...`);
    createImage.mutate({ url });
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-around bg-gray-900">
        {user != null ? (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res[0] && res[0].fileUrl) {
                handleUpload(res[0].fileUrl);
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        ) : (
          <div className="text-xl text-gray-100">Log in first!</div>
        )}
      </main>
    </>
  );
}
