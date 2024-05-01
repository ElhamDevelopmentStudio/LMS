import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 500 });
    }

    const chapterUpdate = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      try {
        const videoAsset = await video.assets.create({
          input: values.videoUrl,
          playback_policy: ["public"],
          test: false,
        });

        if (videoAsset) {
          await db.muxData.create({
            data: {
              chapterId: params.chapterId,
              assetId: videoAsset.id,
              playbackId: videoAsset.playback_ids?.[0]?.id,
            },
          });
        }
      } catch (error) {
        console.log("[Mux Asset Create]", error);
      }
    }
    return NextResponse.json(chapterUpdate);
  } catch (error) {
    console.log("[COURSE_CHAPTER_ID] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
