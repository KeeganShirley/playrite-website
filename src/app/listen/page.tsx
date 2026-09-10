import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ListenPlayer from "@/components/ListenPlayer";
import { getWelcomeTrack } from "@/lib/welcomeTrack";

export const metadata: Metadata = {
  title: "Listen – Playrite",
};

// Always reflect whatever track is loaded in admin right now.
export const dynamic = "force-dynamic";

function titleFromFilename(filename: string) {
  return filename.replace(/\.[^./\\]+$/, "").trim() || "Unreleased Track";
}

export default async function ListenPage() {
  const track = await getWelcomeTrack();

  return (
    <>
      <Nav />
      <main className="flex min-h-dvh flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
          Just for the list
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-[0.06em] text-text sm:text-6xl">
          UNRELEASED
        </h1>

        {track ? (
          <div className="mt-10 flex w-full flex-col items-center">
            <ListenPlayer
              url={track.url}
              downloadUrl={track.downloadUrl}
              title={titleFromFilename(track.filename)}
            />
            <p className="mt-6 max-w-sm text-sm text-text-muted">
              Nobody else has heard this yet. Thanks for being on the list.
            </p>
          </div>
        ) : (
          <p className="mt-8 max-w-md text-text-muted">
            No track loaded right now &mdash; check back soon.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
