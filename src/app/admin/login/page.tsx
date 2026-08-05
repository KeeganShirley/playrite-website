import { loginAction } from "@/app/admin/actions";

export default async function LoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const params = await searchParams;
  const hasError = params?.error === "invalid";

  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-4xl tracking-[0.08em] text-text">
          ADMIN LOGIN
        </h1>

        {hasError ? (
          <p className="mt-4 rounded-sm border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            Incorrect username or password.
          </p>
        ) : null}

        <form action={loginAction} className="mt-8 flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="mt-2 w-full rounded-sm border border-border bg-bg-elevated px-4 py-3 text-text outline-none focus:border-text"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-[0.15em] text-text-muted"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-sm border border-border bg-bg-elevated px-4 py-3 text-text outline-none focus:border-text"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-sm border border-text bg-text px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-bg transition-opacity hover:opacity-90"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
