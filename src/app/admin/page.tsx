import {
  createShowAction,
  deleteShowAction,
  logoutAction,
  updateShowAction,
} from "@/app/admin/actions";
import { getAllShows } from "@/lib/shows";

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

const inputClass =
  "mt-1 w-full rounded-sm border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-text";
const labelClass =
  "block text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted";

export default async function AdminPage({
  searchParams,
}: PageProps<"/admin">) {
  const params = await searchParams;
  const error = params?.error;
  const shows = await getAllShows();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-[0.08em] text-text">
          MANAGE SHOWS
        </h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted hover:text-text"
          >
            Log out
          </button>
        </form>
      </div>

      {error ? (
        <p className="mt-4 rounded-sm border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          Something was missing &mdash; date, venue, and city are required.
        </p>
      ) : null}

      <section className="mt-10 rounded-sm border border-border bg-bg-elevated p-6">
        <h2 className="font-display text-2xl tracking-[0.06em] text-text">
          ADD A SHOW
        </h2>
        <form
          action={createShowAction}
          className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div>
            <label className={labelClass} htmlFor="date">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="time">
              Time (optional)
            </label>
            <input
              id="time"
              name="time"
              type="text"
              placeholder="Doors 7:00 PM / Show 7:30 PM"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="venue">
              Venue
            </label>
            <input id="venue" name="venue" type="text" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="city">
              City
            </label>
            <input id="city" name="city" type="text" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="supportActs">
              Support acts (optional)
            </label>
            <input
              id="supportActs"
              name="supportActs"
              type="text"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="ticketUrl">
              Ticket link (optional)
            </label>
            <input
              id="ticketUrl"
              name="ticketUrl"
              type="url"
              placeholder="https://"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-sm border border-text bg-text px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-bg transition-opacity hover:opacity-90"
            >
              Add show
            </button>
          </div>
        </form>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl tracking-[0.06em] text-text">
          ALL SHOWS
        </h2>

        {shows.length === 0 ? (
          <p className="mt-4 text-text-muted">No shows yet.</p>
        ) : (
          <ul className="mt-6 flex flex-col gap-4">
            {shows.map((show) => (
              <li
                key={show.id}
                className="rounded-sm border border-border p-6"
              >
                <form
                  action={updateShowAction}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <input type="hidden" name="id" value={show.id} />
                  <div>
                    <label className={labelClass}>Date</label>
                    <input
                      name="date"
                      type="date"
                      required
                      defaultValue={toDateInputValue(show.date)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Time (optional)</label>
                    <input
                      name="time"
                      type="text"
                      defaultValue={show.time ?? ""}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Venue</label>
                    <input
                      name="venue"
                      type="text"
                      required
                      defaultValue={show.venue}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input
                      name="city"
                      type="text"
                      required
                      defaultValue={show.city}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Support acts (optional)</label>
                    <input
                      name="supportActs"
                      type="text"
                      defaultValue={show.supportActs ?? ""}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Ticket link (optional)</label>
                    <input
                      name="ticketUrl"
                      type="url"
                      defaultValue={show.ticketUrl ?? ""}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex gap-3 sm:col-span-2">
                    <button
                      type="submit"
                      className="rounded-sm border border-text bg-text px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-bg transition-opacity hover:opacity-90"
                    >
                      Save
                    </button>
                  </div>
                </form>
                <form action={deleteShowAction} className="mt-3">
                  <input type="hidden" name="id" value={show.id} />
                  <button
                    type="submit"
                    className="text-xs font-medium uppercase tracking-[0.15em] text-red-300/80 hover:text-red-300"
                  >
                    Delete show
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
