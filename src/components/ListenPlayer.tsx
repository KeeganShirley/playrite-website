"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ListenPlayer({
  url,
  downloadUrl,
  title,
}: {
  url: string;
  downloadUrl: string;
  title: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // The <audio> can load and fire `loadedmetadata` before React hydrates
    // and attaches its listeners, so sync whatever's already there on mount.
    if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    setCurrent(audio.currentTime);
    setIsPlaying(!audio.paused);

    // Try to start on arrival. Phones usually block autoplay with sound,
    // and that's fine - the play button is sitting right there, big.
    audio.play().catch(() => {});
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  function seek(event: React.MouseEvent<HTMLButtonElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    audio.currentTime = Math.min(Math.max(ratio, 0), 1) * duration;
  }

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="w-full max-w-md">
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      />

      <div className="flex items-center gap-4 rounded-sm border border-border bg-bg-elevated p-5 text-left">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-text text-bg transition-opacity hover:opacity-90 sm:h-16 sm:w-16"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <rect x="4" y="3" width="4.5" height="14" rx="1" />
              <rect x="11.5" y="3" width="4.5" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M5 3.5v13a1 1 0 0 0 1.53.85l10.5-6.5a1 1 0 0 0 0-1.7L6.53 2.65A1 1 0 0 0 5 3.5Z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 font-display text-xl leading-tight tracking-[0.04em] text-text">
            {title}
          </p>
          <button
            type="button"
            onClick={seek}
            aria-label="Seek"
            className="mt-2 block h-1.5 w-full cursor-pointer rounded-full bg-border"
          >
            <span
              className="block h-full rounded-full bg-text"
              style={{ width: `${progress}%` }}
            />
          </button>
          <div className="mt-1.5 flex justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <a
        href={downloadUrl}
        download
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-border px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors hover:border-text hover:text-text"
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 3v10m0 0 4-4m-4 4-4-4M4 16h12" />
        </svg>
        Download MP3
      </a>
    </div>
  );
}
