# Impresiones Postales Landing

Landing page + lead capture form built with React Router v7, Tailwind CSS, and Prisma/PostgreSQL.

## Requirements

- Node.js 20+
- pnpm 10+
- PostgreSQL (or Prisma Dev local Postgres)

## Install

```bash
pnpm install
```

## Database Setup

This project stores quote form submissions in PostgreSQL via Prisma.

1. Configure `DATABASE_URL` in `.env`.
   - Start from: `cp .env.example .env`
2. Configure admin auth env vars in `.env`:
   - `ADMIN_PASSWORD` (required for `/admin` login)
   - `ADMIN_SESSION_SECRET` (recommended; cookie signing secret)
3. Generate Prisma Client and run migrations:

```bash
pnpm prisma:generate
pnpm prisma:migrate:dev --name init_quote_submissions
```

### Quick local DB with Prisma Dev

```bash
pnpm prisma:dev
pnpm prisma:dev:sync-env
pnpm prisma:migrate:dev --name init_quote_submissions
```

`pnpm prisma:dev:sync-env` writes the active Prisma Dev `prisma+postgres://...` URL to `.env`. The app and Prisma CLI are configured to use it correctly.

If you accidentally run `pnpm primsa:dev`, this repo includes a compatibility alias and will still start Prisma Dev.

## Environment Variables

Copy `.env.example` to `.env` and set:

- `DATABASE_URL` (required): PostgreSQL/Prisma connection string
- `ADMIN_PASSWORD` (required): password for `/admin` access
- `ADMIN_SESSION_SECRET` (recommended): secret used to sign admin session cookie
- `VITE_PUBLIC_POSTHOG_KEY` (optional): public PostHog key
- `VITE_PUBLIC_POSTHOG_HOST` (optional): PostHog host URL
- `PRISMA_DEV_INSTANCE` (optional): instance name used by Prisma Dev helper scripts

## Run in Development

```bash
pnpm dev
```

App runs at `http://localhost:5173`.

## Typecheck

```bash
pnpm typecheck
```

## Build and Run Production

```bash
pnpm build
pnpm start
```

## Production DB Migrations

Before starting a new production release:

1. Set production `DATABASE_URL`.
2. Ensure `ADMIN_PASSWORD` is set (and `ADMIN_SESSION_SECRET` is strongly recommended).
3. Apply committed migrations:

```bash
pnpm prisma:migrate:deploy
pnpm prisma:generate
```

4. Deploy and start app (`pnpm build && pnpm start`).

## Data Model

Form submissions are stored in the `QuoteSubmission` table (see `prisma/schema.prisma`).

Reference images uploaded from the form are stored on disk under `temp/uploads/`; only the stored path is saved in the database.

## Additional Docs

- `docs/database.md` for DB setup and migration workflow.
