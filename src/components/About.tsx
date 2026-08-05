import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 sm:items-center sm:gap-16 sm:px-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:order-2">
          <Image
            src="/images/about.jpg"
            alt="Playrite, live"
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="sm:order-1">
          <h2 className="font-display text-4xl tracking-[0.08em] text-text sm:text-5xl">
            ABOUT
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-muted">
            Playrite is an energetic DC-based quintet originating from the
            armpits of the internet &mdash; reddit and, probably nicher than
            your favs, bandmix.com. With a sound characterized by noisey lead
            guitar and punchy, nostalgic vocals, playrite is sure to leave you
            thinking &ldquo;wow, ok girl.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
