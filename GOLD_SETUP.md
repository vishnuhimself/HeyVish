# Gold Portfolio Setup

The `/gold` route is a private, password-protected portfolio tracker. It uses
a proper server-side architecture:

- **Auth**: password checked server-side; session held in a signed, httpOnly
  cookie. No password or secret is ever shipped to the browser.
- **Storage**: Neon Postgres (via the Vercel integration). The database is only
  reachable from server-side API routes.
- **Price updates**: a scheduled GitHub Action scrapes the 22K price and writes
  it directly to Postgres.

## Environment variables

These are **server-only** — never prefix them with `NEXT_PUBLIC_`.

| Variable         | Where            | Purpose                                        |
| ---------------- | ---------------- | ---------------------------------------------- |
| `DATABASE_URL`   | Vercel + local   | Neon Postgres connection string (pooled)       |
| `POSTGRES_URL`   | Vercel + local   | Same value; added by the Neon integration      |
| `SESSION_SECRET` | Vercel + local   | Signs the session cookie. `openssl rand -hex 32` |
| `GOLD_PASSWORD`  | Vercel + local   | The password required to open `/gold`          |

Locally these live in `.env.local` (gitignored). In production, set them in the
Vercel dashboard or via `vercel env add`.

## First-time setup

1. Create the Neon Postgres database from the Vercel dashboard
   (Storage → Create Database → Neon Postgres) and connect it to the project.
2. Pull the connection vars locally: `vercel env pull .env.local`.
3. Add `SESSION_SECRET` and `GOLD_PASSWORD` locally and in Vercel.
4. Create the tables: `node --env-file=.env.local scripts/db-migrate.mjs`.

## Changing the password

Update `GOLD_PASSWORD` in Vercel (and `.env.local` for local dev). No code
changes needed.

## Automated price updates

The workflow at `.github/workflows/gold-price-scraper.yml` runs daily and calls
`scripts/scrape-gold-price.mjs`, which writes the latest price to Postgres. It
needs a single repository secret:

- `DATABASE_URL` — the same Neon connection string.

Add it under GitHub → Settings → Secrets and variables → Actions.

You can run the scraper manually with:

```bash
node --env-file=.env.local scripts/scrape-gold-price.mjs
```
