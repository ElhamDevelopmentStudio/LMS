import { IsTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  const isAuthorized = IsTeacher(userId);

  if (!userId || !isAuthorized) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachments: f(["text", "image", "audio", "video", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  ChapterVideo: f({
    video: { maxFileSize: "32GB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
