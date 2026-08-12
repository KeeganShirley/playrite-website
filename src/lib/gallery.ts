export type GalleryImage = {
  src: string;
  width: number;
  height: number;
};

// Small deterministic "scattered on a table" tilt per photo - based on
// index, not Math.random(), so server and client render the same thing.
export function tiltForIndex(index: number) {
  const angles = [-3, 2, -2, 4, -4, 1, -1, 3];
  return angles[index % angles.length];
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/gallery/gallery-21.jpg", width: 1800, height: 1350 },
  { src: "/images/gallery/gallery-02.jpg", width: 1800, height: 1014 },
  { src: "/images/gallery/gallery-03.jpg", width: 1800, height: 1014 },
  { src: "/images/gallery/gallery-04.jpg", width: 1800, height: 1014 },
  { src: "/images/gallery/gallery-05.jpg", width: 1800, height: 1200 },
  { src: "/images/gallery/gallery-06.jpg", width: 1800, height: 1200 },
  { src: "/images/gallery/gallery-07.jpg", width: 1200, height: 1800 },
  { src: "/images/gallery/gallery-08.jpg", width: 1800, height: 1200 },
  { src: "/images/gallery/gallery-09.jpg", width: 1800, height: 1200 },
  { src: "/images/gallery/gallery-10.jpg", width: 1800, height: 1200 },
  { src: "/images/gallery/gallery-11.jpg", width: 1800, height: 1200 },
  { src: "/images/gallery/gallery-12.jpg", width: 1350, height: 1800 },
  { src: "/images/gallery/gallery-13.jpg", width: 1800, height: 1350 },
  { src: "/images/gallery/gallery-14.jpg", width: 1800, height: 1350 },
  { src: "/images/gallery/gallery-15.jpg", width: 1800, height: 1350 },
  { src: "/images/gallery/gallery-16.jpg", width: 1800, height: 1355 },
  { src: "/images/gallery/gallery-17.jpg", width: 1445, height: 1800 },
  { src: "/images/gallery/gallery-18.jpg", width: 1800, height: 1440 },
  { src: "/images/gallery/gallery-19.jpg", width: 1800, height: 1264 },
  { src: "/images/gallery/gallery-20.jpg", width: 1800, height: 1013 },
  { src: "/images/gallery/gallery-01.jpg", width: 1331, height: 1800 },
];
