import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ShowsList from "@/components/ShowsList";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";
import { getUpcomingShows } from "@/lib/shows";

// Re-check the upcoming-shows list at most once an hour, so a show that
// has passed its date drops off the page even without an admin edit.
export const revalidate = 3600;

export default async function Home() {
  const shows = await getUpcomingShows();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <ShowsList shows={shows} />
        <VideoSection />
        <About />
      </main>
      <Footer />
    </>
  );
}
