import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1mb; raw phone/camera photos (especially several
      // dropped at once) blow well past that before they're compressed.
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
