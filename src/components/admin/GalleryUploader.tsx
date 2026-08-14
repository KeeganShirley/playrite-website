"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

export default function GalleryUploader() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      setStatus(`Uploading ${i + 1} of ${imageFiles.length}…`);
      try {
        const { width, height } = await getImageDimensions(file);
        await upload(`gallery/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/gallery/upload",
          clientPayload: JSON.stringify({ width, height }),
        });
      } catch (err) {
        console.error("Gallery upload failed:", err);
      }
    }

    setStatus("Processing…");
    // The DB record lands a moment after the upload itself, via a
    // webhook Vercel calls back to /api/gallery/upload.
    await new Promise((r) => setTimeout(r, 2000));
    setStatus(null);
    router.refresh();
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-sm border-2 border-dashed p-10 text-center transition-colors ${
        isDragging ? "border-text bg-bg-elevated" : "border-border"
      }`}
    >
      <p className="text-sm text-text-muted">
        {status ?? "Drag photos here, or click to browse"}
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
