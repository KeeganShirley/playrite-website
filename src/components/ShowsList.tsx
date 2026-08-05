import type { Show } from "@prisma/client";

function formatShowDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function ShowsList({ shows }: { shows: Show[] }) {
  return (
    <div className="w-full rounded-sm border border-border bg-bg/85 backdrop-blur-md">
      <h2 className="border-b border-border/60 px-5 py-4 font-display text-2xl tracking-[0.08em] text-text">
        UPCOMING SHOWS
      </h2>

      <div className="max-h-[45vh] overflow-y-auto px-5 py-4">
        {shows.length === 0 ? (
          <p className="text-sm text-text-muted">
            No shows on the books right now &mdash; check back soon.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-border/40">
            {shows.map((show) => (
              <li key={show.id} className="py-4 first:pt-0 last:pb-0">
                <p className="font-display text-lg tracking-[0.05em] text-text">
                  {formatShowDate(show.date)}
                </p>
                <p className="text-sm text-text">
                  {show.venue}
                  <span className="text-text-muted"> &middot; {show.city}</span>
                </p>
                {show.supportActs ? (
                  <p className="text-xs text-text-muted">{show.supportActs}</p>
                ) : null}
                {show.time ? (
                  <p className="text-xs text-text-muted">{show.time}</p>
                ) : null}
                {show.ticketUrl ? (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-xs font-medium uppercase tracking-[0.15em] text-text underline underline-offset-4 hover:no-underline"
                  >
                    Tickets
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
