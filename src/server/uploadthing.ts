/** server/uploadthing.ts */
import type { NextApiRequest, NextApiResponse } from "next";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { getServerAuthSession } from "./auth";
import { currentUser, getAuth } from "@clerk/nextjs/server";

const f = createUploadthing();

const auth = (req: NextApiRequest, res: NextApiResponse) => {
  return { id: "fakeId" };
}; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    // Todo: wait for uploadthing or imagrate to app routes
    .middleware(async ({ req, res }) => {
      const user = await auth(req, res);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { id: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.id);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
