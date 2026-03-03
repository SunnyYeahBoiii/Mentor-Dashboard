# Mentor Dashboard

Monorepo for a mentoring operations dashboard with:
- `apps/web`: Next.js frontend (React 19, App Router)
- `apps/api`: NestJS backend (Prisma + PostgreSQL)
- `packages/ui`: shared React UI components
- shared lint and TypeScript config packages

This repository uses `pnpm` workspaces + Turborepo for task orchestration.

## Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Available Commands](#available-commands)
- [Database Workflow (Prisma)](#database-workflow-prisma)
- [Authentication and Session Flow](#authentication-and-session-flow)
- [API Overview](#api-overview)
- [Development Notes](#development-notes)
- [Troubleshooting](#troubleshooting)

## Architecture

```text
mentor-dashboard/
  apps/
    api/        # NestJS backend + Prisma schema/migrations
    web/        # Next.js frontend
  packages/
    ui/         # shared UI components
    eslint-config/
    typescript-config/
  turbo.json
  pnpm-workspace.yaml
```

## Tech Stack

### Frontend (`apps/web`)
- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- React Query (`@tanstack/react-query`)
- Axios client with cookie-based auth handling and token refresh retry

### Backend (`apps/api`)
- NestJS 11
- Prisma 7 + PostgreSQL
- Passport Google OAuth (`passport-google-oauth20`)
- Swagger/OpenAPI at `http://localhost:3001/api`
- Cookie-based session/token usage for Google integration

### Tooling
- `pnpm` workspaces
- Turborepo task runner/caching
- ESLint + Prettier + TypeScript

## Prerequisites

- Node.js `>=18`
- `pnpm` `10.30.2` (or compatible)
- PostgreSQL database (or compatible Postgres URL)
- Google Cloud OAuth credentials (for `/auth/google` and Meet link generation)

## Quick Start

1. Install dependencies from the repository root:

```bash
pnpm install
```

2. Configure environment variables:
- `apps/api/.env`
- `apps/web/.env`

3. Run Prisma migrations (from root):

```bash
pnpm --filter api exec prisma migrate dev
```

4. Start development for all workspaces:

```bash
pnpm dev
```

Default local URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- API docs: `http://localhost:3001/api`

## Environment Variables

Create local `.env` files per app. Do not commit real secrets.

### `apps/api/.env`

```env
PORT=3001
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
GOOGLE_CLIENT_ID="<google-client-id>"
GOOGLE_CLIENT_SECRET="<google-client-secret>"
GOOGLE_CALLBACK_URL="http://localhost:3001/auth/google/callback"
ALLOWED_ORIGINS="http://localhost:3000"
```

Also used by the backend flow:
- `NODE_ENV` (affects secure cookie behavior in some paths)
- optional Google token/session values depending on local flow

### `apps/web/.env`

```env
NEXT_PUBLIC_BACKEND_URL="http://localhost:3001"
AUTH_USERNAME="<local-gate-username>"
AUTH_PASSWORD="<local-gate-password>"
```

> Security note: if credentials were ever committed or shared, rotate them immediately.

## Available Commands

Run from the repository root unless noted otherwise.

### Root workspace

```bash
pnpm dev          # turbo run dev
pnpm build        # turbo run build
pnpm lint         # turbo run lint
pnpm check-types  # turbo run check-types
pnpm format       # prettier on ts/tsx/md files
```

### API workspace (`apps/api`)

```bash
pnpm --filter api dev
pnpm --filter api build
pnpm --filter api start
pnpm --filter api start:prod
pnpm --filter api lint
pnpm --filter api check-types
pnpm --filter api test
pnpm --filter api test:e2e
pnpm --filter api test:cov
```

### Web workspace (`apps/web`)

```bash
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web start
pnpm --filter web lint
pnpm --filter web check-types
```

### UI package (`packages/ui`)

```bash
pnpm --filter @repo/ui lint
pnpm --filter @repo/ui check-types
pnpm --filter @repo/ui generate:component
```

## Database Workflow (Prisma)

Prisma lives in `apps/api/prisma`.

- Schema: `apps/api/prisma/schema.prisma`
- Migrations: `apps/api/prisma/migrations/*`
- Generated client output: `apps/api/generated`

Common commands:

```bash
# Create/apply migration in development
pnpm --filter api exec prisma migrate dev

# Apply existing migrations in non-dev environments
pnpm --filter api exec prisma migrate deploy

# Regenerate Prisma client
pnpm --filter api exec prisma generate

# Open Prisma Studio (optional)
pnpm --filter api exec prisma studio
```

## Authentication and Session Flow

Two auth layers are currently present:

1. Local frontend gate (`apps/web/app/api/auth/route.ts`)
- Validates `AUTH_USERNAME` / `AUTH_PASSWORD`
- Sets `md_auth_token` cookie for UI access gating

2. Google OAuth + Meet token flow (`apps/api/src/auth`, `apps/api/src/google-meet`)
- `GET /auth/google` and callback route handle Google sign-in
- Backend stores Google refresh token in DB
- `/meet/refresh` exchanges refresh token for access token and sets cookie
- Frontend Axios client retries on auth failures after refresh

## API Overview

Main backend route groups:

- `/auth` (Google OAuth flow)
- `/students`
- `/classes`
- `/sections`
- `/student-class`
- `/meet` (Meet creation + token refresh)

OpenAPI docs are available at:

`http://localhost:3001/api`

## Development Notes

- Turborepo task configuration is defined in `turbo.json`.
- Build task includes `.env*` in inputs; env changes can affect cache behavior.
- No dedicated Docker or devcontainer setup is currently included.
- No CI workflow is currently committed under `.github/workflows`.

## Troubleshooting

- `CORS` issues:
  - ensure `ALLOWED_ORIGINS` in `apps/api/.env` includes `http://localhost:3000`
- Login modal does not unlock UI:
  - confirm `AUTH_USERNAME` and `AUTH_PASSWORD` are set in `apps/web/.env`
- API cannot connect to DB:
  - verify `DATABASE_URL` and that the database is reachable
- Google OAuth redirect problems:
  - verify callback URL in both `.env` and Google Cloud console
- 401/500 during protected API calls:
  - check `/meet/refresh` behavior and cookie settings (`secure`, `sameSite`) for local vs prod
