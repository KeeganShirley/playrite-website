import { del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function getUploadedGalleryPhotos() {
  return prisma.galleryPhoto.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createGalleryPhoto(
  url: string,
  width: number,
  height: number
) {
  return prisma.galleryPhoto.create({ data: { url, width, height } });
}

export async function deleteGalleryPhoto(id: string) {
  const photo = await prisma.galleryPhoto.findUnique({ where: { id } });
  if (!photo) return;

  await prisma.galleryPhoto.delete({ where: { id } });
  try {
    await del(photo.url);
  } catch {
    // The DB row is gone either way - a stray blob isn't worth failing over.
  }
}
