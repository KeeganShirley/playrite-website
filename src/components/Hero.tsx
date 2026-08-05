import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-end overflow-hidden sm:items-center"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-mobile.jpg"
          alt="Playrite band photo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:hidden"
        />
        <Image
          src="/images/hero-desktop.jpg"
          alt="Playrite band photo"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center sm:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-transparent to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:px-10 sm:pb-24">
        <h1 className="font-display text-7xl leading-[0.9] tracking-[0.04em] text-text sm:text-9xl">
          PLAYRITE
        </h1>
        <p className="mt-4 max-w-md text-sm uppercase tracking-[0.3em] text-text-muted sm:text-base">
          Rock band &middot; Washington, DC
        </p>
      </div>
    </section>
  );
}
