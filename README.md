A personal portfolio, blog, and lightweight admin CMS, built on Next.js (App Router) with Prisma/Postgres.

## Stack

- Next.js 16 (Turbopack), React 19, TypeScript
- Prisma 7 + Postgres (via `@prisma/adapter-pg`)
- Tailwind CSS 4
- TipTap for the rich-text post/project editor
- `jose` + `bcryptjs` for the single-admin JWT auth

## Local setup

1. Copy `.env.example` to `.env` and fill in the values (see comments in that file for how to generate `JWT_SECRET` and `ADMIN_PASSWORD_HASH`).
2. Start a Postgres database. For local dev without installing Postgres yourself, Prisma can run one for you:
   ```bash
   npx prisma dev
   ```
   It prints a `prisma+postgres://localhost:...` URL — put that in `DATABASE_URL`.
3. Apply migrations and generate the client:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```
4. Run the app:
   ```bash
   npm run dev
   ```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint |
| `npm test` | Run the `node --test` suite in `src/lib/*.test.mjs` |

## Architecture notes

- **Public routes** (`/`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`) are Server Components that query Prisma directly and use ISR (`revalidate = 60`); admin actions call `revalidatePath` on write for near-immediate freshness.
- **Admin** (`/admin/*`) is gated two ways: `src/proxy.ts` (this Next.js version renamed `middleware.ts` to `proxy.ts` — see `node_modules/next/dist/docs` for anything else that looks unfamiliar) redirects unauthenticated requests before any page code runs, and every server action also calls `requireAuth()` independently, per Next's own guidance not to rely on the proxy alone.
- **Auth** is a single hardcoded admin account (`ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH`), no user table. Session is a JWT in an httpOnly cookie. Core verification logic lives in `src/lib/session.ts` (framework-free, so it's unit-testable); `src/lib/auth.ts` wraps it with the `next/headers`/`next/navigation` glue.
- **Content**: posts and projects store TipTap JSON in a `content` column. `src/lib/render-content.ts` converts it to sanitized HTML (`sanitize-html`) before it's injected via `dangerouslySetInnerHTML` — this is the only place untrusted-ish admin content becomes raw HTML, so any change there needs care.
- **CSP**: `next.config.ts` sets a Content-Security-Policy without nonces (`unsafe-inline` for script/style), because the app renders a lot of inline `style={{}}` props and uses static/ISR rendering rather than per-request dynamic rendering. Switching to a nonce-based CSP would require forcing every page dynamic — see the Next.js CSP guide in `node_modules/next/dist/docs` before changing this.

## A note on this Next.js version

This project intentionally does not track the very latest Next.js APIs 1:1 with common training-data knowledge — see `AGENTS.md` at the repo root. When something about routing, caching, or file conventions looks off, check `node_modules/next/dist/docs/` before assuming.
