import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { GALLERY_IMAGES, tiltForIndex } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery – Playrite",
};

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-6 pb-20 pt-28 sm:px-10 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <h1 className="sr-only">Gallery</h1>

          <div className="columns-2 gap-5 sm:columns-3 lg:columns-4">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={image.src}
                style={{ transform: `rotate(${tiltForIndex(index)}deg)` }}
                className="mb-5 break-inside-avoid rounded-sm bg-accent p-1 shadow-lg transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-105"
              >
                <Image
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
