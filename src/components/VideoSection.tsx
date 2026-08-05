import { MUSIC_VIDEO_URL, getYouTubeEmbedUrl } from "@/lib/links";

export default function VideoSection() {
  return (
    <section id="music" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <h2 className="font-display text-4xl tracking-[0.08em] text-text sm:text-5xl">
          TEASERS (MUSIC VIDEO)
        </h2>
        <div className="mt-10 aspect-video w-full overflow-hidden rounded-sm bg-bg-elevated">
          <iframe
            className="h-full w-full"
            src={getYouTubeEmbedUrl(MUSIC_VIDEO_URL)}
            title="Playrite music video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
