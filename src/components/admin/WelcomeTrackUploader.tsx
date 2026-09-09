"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

export default function WelcomeTrackUploader() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("audio/") && !file.name.toLowerCase().endsWith(".mp3")) {
      return;
    }

    setStatus(`Uploading ${file.name}…`);
    try {
      await upload(`welcome-track/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/welcome-track/upload",
        clientPayload: file.name,
      });
    } catch (err) {
      console.error("Welcome track upload failed:", err);
    }

    setStatus("Processing…");
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
        {status ?? "Drag an MP3 here, or click to browse"}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="audio/mpeg,.mp3"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
