import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { joinMailingListAction } from "@/app/join/actions";

export const metadata: Metadata = {
  title: "Join the List – Playrite",
};

export default async function JoinPage({
  searchParams,
}: PageProps<"/join">) {
  const params = await searchParams;
  const success = params?.success === "1";
  const error = params?.error;

  return (
    <>
      <Nav />
      <main className="flex min-h-dvh flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl tracking-[0.06em] text-text sm:text-6xl">
          JOIN THE GROUP CHAT&hellip;
        </h1>
        <p className="mt-4 max-w-md text-text-muted">
          Get on the list for new music, shows, and whatever else we feel
          like sending.
        </p>

        {success ? (
          <p className="mt-8 rounded-sm border border-border bg-bg-elevated px-5 py-3 text-sm text-text">
            You&apos;re in. Talk soon.
          </p>
        ) : (
          <form
            action={joinMailingListAction}
            className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-sm border border-border bg-bg-elevated px-4 py-3 text-text outline-none focus:border-text"
            />
            <button
              type="submit"
              className="rounded-sm border border-text bg-text px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-bg transition-opacity hover:opacity-90"
            >
              Join
            </button>
          </form>
        )}

        {error === "invalid" ? (
          <p className="mt-4 text-sm text-red-300/80">
            That doesn&apos;t look like a valid email &mdash; try again.
          </p>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
