# Mentor Dashboard Web

Next.js frontend for Mentor Dashboard.

## Local Setup

```bash
pnpm install
cp apps/web/.env.example apps/web/.env
pnpm --filter web dev
```

Default URL: `http://localhost:3000`

## Environment

- `NEXT_PUBLIC_BACKEND_URL`: backend API origin, default `http://localhost:21389`.
- `AUTH_USERNAME` / `AUTH_PASSWORD`: local UI gate credentials. These must also be set to the same values in `apps/api/.env` so the API can verify the signed local auth cookie.

## Commands

```bash
pnpm --filter web check-types
pnpm --filter web lint
pnpm --filter web build
pnpm --filter web start
```
