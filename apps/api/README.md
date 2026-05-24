# Mentor Dashboard API

NestJS backend for Mentor Dashboard. It exposes CRUD APIs, Google OAuth, Google Meet link creation, and Prisma/PostgreSQL persistence.

## Local Setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
pnpm --filter api exec prisma migrate dev
pnpm --filter api dev
```

Default URL: `http://localhost:21389`
Swagger: `http://localhost:21389/api`

## Required Environment

See `.env.example`. Important auth variables:

- `APP_SESSION_SECRET`: at least 32 characters; signs opaque backend session hashes.
- `GOOGLE_TOKEN_ENCRYPTION_KEY`: at least 32 characters; encrypts Google refresh tokens at rest.
- `AUTH_USERNAME` / `AUTH_PASSWORD`: must match the web app values so API guards can verify the local auth cookie.
- `ALLOWED_GOOGLE_EMAILS` / `ALLOWED_GOOGLE_DOMAINS`: allowlist for first-time Google OAuth users.
- `FRONTEND_URL`: redirect target after Google login/logout.

## Commands

```bash
pnpm --filter api prisma:generate
pnpm --filter api check-types
pnpm --filter api lint
pnpm --filter api test
pnpm --filter api build
pnpm --filter api start:prod
```

`build` and `check-types` regenerate the Prisma client before compiling.
