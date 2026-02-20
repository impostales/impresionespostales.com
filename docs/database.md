# Database and Prisma Guide

This project uses Prisma ORM with PostgreSQL for quote form submissions.

## Files

- Prisma schema: `prisma/schema.prisma`
- Prisma config: `prisma.config.ts`
- DB client singleton: `app/server/db.ts`
- Quote persistence: `app/server/quotes.ts`
- Route action using persistence: `app/routes/home.tsx`

## Local Development

### Option A: Your own PostgreSQL

1. Set `.env`:

```bash
cp .env.example .env
DATABASE_URL="postgresql://user:password@localhost:5432/impresionespostales?schema=public"
```

2. Run:

```bash
pnpm prisma:generate
pnpm prisma:migrate:dev --name init_quote_submissions
```

### Option B: Prisma Dev local Postgres

1. Start Prisma Dev database (instance name: `impresionespostales`):

```bash
pnpm prisma:dev
```

2. Sync `.env` automatically with the active Prisma Dev URLs:

```bash
pnpm prisma:dev:sync-env
```

3. Run migrations:

```bash
pnpm prisma:migrate:dev --name init_quote_submissions
```

4. Optional checks:

```bash
pnpm prisma migrate status
pnpm prisma:studio
```

Notes:
- Prisma Dev can rotate TCP ports between runs. Always run `pnpm prisma:dev:sync-env` after starting Prisma Dev to avoid stale connection errors.
- This project writes a `prisma+postgres://...` value into `.env` (`DATABASE_URL`) for Prisma Dev.
- Runtime client setup in `app/server/db.ts` is hybrid:
  - Uses `@prisma/adapter-pg` for all runtime queries.
  - If `DATABASE_URL` is `prisma+postgres://...`, it decodes the embedded direct TCP URL automatically.
  - If `DATABASE_URL` is `postgres://...` or `postgresql://...`, it uses it directly.
- If you type `pnpm primsa:dev` by mistake, an alias is available, but prefer `pnpm prisma:dev`.

## Migration Workflow

When changing `prisma/schema.prisma`:

1. Create/apply migration in dev:

```bash
pnpm prisma:migrate:dev --name <descriptive_name>
```

2. Commit:
- Updated `prisma/schema.prisma`
- New folder under `prisma/migrations/`

## Production Migrations

Use migration deploy mode in CI/CD or release pipeline:

```bash
pnpm prisma:migrate:deploy
pnpm prisma:generate
```

Notes:
- `prisma migrate deploy` only runs existing committed migrations.
- Do not use `prisma migrate dev` in production.

## Inspecting Data

```bash
pnpm prisma:studio
```

Open Prisma Studio and inspect the `QuoteSubmission` table.
