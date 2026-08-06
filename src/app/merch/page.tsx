import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Merch – Playrite",
};

export default function MerchPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-dvh flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl tracking-[0.08em] text-text sm:text-5xl">
          MERCH
        </h1>
        <p className="mt-6 max-w-md text-lg text-text-muted">
          Oops, we don&apos;t have merch yet. Coming soon!
        </p>
      </main>
      <Footer />
    </>
  );
}
