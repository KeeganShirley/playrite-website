"use client";

import { useRef, useState } from "react";
import { uploadGalleryPhotosAction } from "@/app/admin/actions";

export default function GalleryUploader() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0 || !inputRef.current) return;
    inputRef.current.files = files;
    setIsUploading(true);
    formRef.current?.requestSubmit();
  }

  return (
    <form ref={formRef} action={uploadGalleryPhotosAction}>
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
          {isUploading
            ? "Uploading…"
            : "Drag photos here, or click to browse"}
        </p>
        <input
          ref={inputRef}
          type="file"
          name="photos"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </form>
  );
}
