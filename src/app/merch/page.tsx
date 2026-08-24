import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSiteText } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Merch – Playrite",
};

export default async function MerchPage() {
  const message = await getSiteText("merch_message");

  return (
    <>
      <Nav />
      <main className="flex min-h-dvh flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl tracking-[0.08em] text-text sm:text-5xl">
          MERCH
        </h1>
        <p className="mt-6 max-w-md text-lg text-text-muted">{message}</p>
      </main>
      <Footer />
    </>
  );
}
