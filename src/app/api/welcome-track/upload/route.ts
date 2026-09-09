import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminSession } from "@/lib/auth";
import { setWelcomeTrack } from "@/lib/welcomeTrack";

// Same direct-to-Blob pattern as the gallery uploader - a finished mix can
// easily be 5-10MB, well past Vercel's ~4.5MB serverless payload limit.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!(await isAdminSession())) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: ["audio/mpeg", "audio/mp3"],
          addRandomSuffix: true,
          maximumSizeInBytes: 100 * 1024 * 1024,
          tokenPayload: clientPayload,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const filename = tokenPayload || blob.pathname.split("/").pop() || "track.mp3";
        await setWelcomeTrack(blob.url, filename);
        revalidatePath("/admin");
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
