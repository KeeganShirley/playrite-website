import Image from "next/image";
import type { Show } from "@prisma/client";
import ShowsList from "@/components/ShowsList";

export default function Hero({ shows }: { shows: Show[] }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative h-[70vh] sm:min-h-dvh">
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
        <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-transparent" />
      </div>

      <div
        id="shows"
        className="px-4 pb-8 pt-6 sm:absolute sm:inset-y-0 sm:right-10 sm:flex sm:w-96 sm:items-center sm:px-0 sm:pb-0 sm:pt-0"
      >
        <ShowsList shows={shows} />
      </div>
    </section>
  );
}
