import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminSession } from "@/lib/auth";
import { createGalleryPhoto } from "@/lib/galleryPhotos";

// Uploads go directly from the browser to Blob storage (not through this
// route's own request body), which is what lets full-size camera photos
// bypass Vercel's ~4.5MB serverless function payload limit. This route
// only issues a short-lived upload token and then gets notified once the
// upload is done.
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
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/heic",
            "image/heif",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 50 * 1024 * 1024,
          tokenPayload: clientPayload,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const { width, height } = tokenPayload
          ? (JSON.parse(tokenPayload) as { width?: number; height?: number })
          : {};
        if (width && height) {
          await createGalleryPhoto(blob.url, width, height);
          revalidatePath("/gallery");
          revalidatePath("/admin");
        }
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
