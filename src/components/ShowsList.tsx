import type { Show } from "@prisma/client";

function formatShowDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function ShowsList({ shows }: { shows: Show[] }) {
  return (
    <section id="shows" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <h2 className="font-display text-4xl tracking-[0.08em] text-text sm:text-5xl">
          UPCOMING SHOWS
        </h2>

        {shows.length === 0 ? (
          <p className="mt-8 text-text-muted">
            No shows on the books right now &mdash; check back soon.
          </p>
        ) : (
          <ul className="mt-10 divide-y divide-border/60 border-t border-border/60">
            {shows.map((show) => (
              <li
                key={show.id}
                className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="font-display text-2xl tracking-[0.06em] text-text sm:w-56 sm:shrink-0">
                    {formatShowDate(show.date)}
                  </span>
                  <div>
                    <p className="text-text">
                      {show.venue}
                      <span className="text-text-muted"> &middot; {show.city}</span>
                    </p>
                    {show.supportActs ? (
                      <p className="text-sm text-text-muted">{show.supportActs}</p>
                    ) : null}
                    {show.time ? (
                      <p className="text-sm text-text-muted">{show.time}</p>
                    ) : null}
                  </div>
                </div>

                {show.ticketUrl ? (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center justify-center rounded-sm border border-border px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-text transition-colors hover:border-text hover:bg-bg-elevated"
                  >
                    Tickets
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
