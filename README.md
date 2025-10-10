# Meal Planner (Next.js + TypeScript)

Production‑ready meal planning application built with Next.js App Router, TypeScript, Prisma ORM, PostgreSQL, Tailwind CSS, and modern React tooling. Admins manage foods, categories, and serving units; users create meals from foods with serving sizes. Nutrition totals are computed dynamically.

Live environment: https://meal-planner-liart-rho.vercel.app/

## Executive Summary

- Modern Next.js App Router app with React 19 and TypeScript
- Type‑safe backend with Prisma ORM and PostgreSQL
- Robust data layer via TanStack Query and Zod validation
- Composable UI with Radix primitives, Tailwind CSS v4, and lucide icons
- Clear separation of concerns: UI, state, services, schema/types

## Table of Contents

- Features
- Tech Stack
- Project Structure
- Detailed File Structure
- Architecture Overview
- Requirements
- Getting Started
- Database (Prisma + PostgreSQL)
- Development Scripts
- Deployment (Vercel)
- API Overview (App Router)
- Data Model Summary
- Troubleshooting
- Quality & Tooling
- Roadmap
- Packages
- License

## Features

- Meal creation with granular serving units and automatic nutrition totals
- Admin management for foods, categories, and serving units
- Type‑safe data access via Prisma and Zod validation
- Modern UI with Radix primitives, Tailwind CSS, and lucide icons
- Client/server state via React Query and Zustand

## Tech Stack

- Framework: Next.js 15 (App Router), React 19, TypeScript
- Styling: Tailwind CSS v4 (via `@tailwindcss/postcss`), CSS Modules
- UI: Radix UI primitives, custom `components/ui/*`, `lucide-react`, `sonner`
- Forms & Validation: React Hook Form, Zod (+ zod-validation-error)
- Data Fetching: TanStack Query (React Query) v5
- State: Zustand
- Auth: NextAuth.js v5 beta
- Database/ORM: Prisma ORM, PostgreSQL (optional Prisma Accelerate at runtime), Prisma Studio

## Project Structure (high level)

```
src/
	app/                       # Next.js App Router
		(dashboard)/             # Dashboard layouts and pages
			admin/                 # Admin pages (foods, categories, serving units)
			client/                # Client pages (meals, meal cards)
		api/auth/[...nextauth]   # NextAuth route
	components/                # UI and providers
	lib/                       # Utils, db, helpers, stores
prisma/
	schema.prisma              # Prisma schema (PostgreSQL)
	migrations/                # Prisma migrations
generated/prisma/            # Prisma Client output
```

Path aliases (see `tsconfig.json`):

## Detailed File Structure

```
.
├─ prisma/
│  ├─ schema.prisma              # Prisma schema (PostgreSQL)
│  └─ migrations/                # Prisma migration history
├─ generated/
│  └─ prisma/                    # Prisma Client output (generated)
├─ public/
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ src/
│  ├─ app/
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ (dashboard)/
│  │     ├─ layout.tsx
│  │     ├─ _components/
│  │     │  └─ dahboard-layout.tsx
│  │     └─ admin/
│  │        ├─ page.tsx
│  │        └─ foods-management/
│  │           ├─ categories/
│  │           │  ├─ page.tsx
│  │           │  ├─ _components/
│  │           │  │  ├─ category-cards.tsx
│  │           │  │  └─ category-form-dialog.tsx
│  │           │  ├─ _lib/
│  │           │  │  └─ use-category-store.ts
│  │           │  ├─ _services/
│  │           │  │  ├─ categoryMutation.ts
│  │           │  │  ├─ categoryQueries.ts
│  │           │  │  ├─ use-category-mutations.ts
│  │           │  │  └─ use-category-queries.ts
│  │           │  └─ _types/
│  │           │     └─ categorySchema.ts
│  │           └─ foods/ and serving-units/ (similar structure if present)
│  ├─ components/
│  │  ├─ provider.tsx
│  │  ├─ theme-toogle.tsx
│  │  └─ ui/
│  │     ├─ alert-dialog-provider.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ avatar.tsx
│  │     ├─ button.tsx
│  │     ├─ contolled-input.tsx
│  │     ├─ dialog.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ separator.tsx
│  │     └─ sonner.tsx
│  └─ lib/
│     ├─ createStore.ts
│     ├─ customErrorMap.ts
│     ├─ db.ts
│     ├─ executeAction.ts
│     ├─ getErrorMessage.ts
│     ├─ use-global-store.ts
│     └─ utils.ts
├─ components.json
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ tsconfig.json
└─ README.md
```

- `@/*` → `./src/*`
- `$/*` → `./*` (used for Prisma types import from `generated/prisma`)

## Architecture Overview

Layers

- UI: Next.js App Router (server/client components), Tailwind CSS, Radix primitives
- State: React Query (server state) and Zustand (UI/local state)
- Validation: Zod schemas shared across forms and server routes/actions
- Data: Prisma ORM (PostgreSQL); Prisma Client in `generated/prisma`
- Auth: NextAuth v5 beta

Data flow

1. Client components call React Query hooks
2. Hooks invoke service modules (queries/mutations) calling server routes/actions
3. Server uses Prisma to access Postgres with generated types
4. Zod validates inputs; React Query caches results

## Requirements

- Node.js 18+ (recommended 20+)
- npm 9+ (or pnpm/yarn if you prefer)
- PostgreSQL database (local or cloud: Neon, Supabase, Railway, Vercel Postgres, or Prisma Postgres)

## Getting Started

```powershell
# 1) Install dependencies
npm install

# 2) Copy environment template and fill in values
copy .env.local .env.local.bak  # optional backup
```

### Environment Variables

Create `.env.local` in the project root:

```bash
# NextAuth
AUTH_SECRET="<generate a strong secret>"

# Runtime connection (Prisma Accelerate optional, improves query performance)
# Use either your direct Postgres URL or Accelerate URL here. If you use Accelerate,
# also provide DIRECT_DATABASE_URL below for migrations.
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
# or
# DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=..."

# Required for migrations when using Accelerate for DATABASE_URL
DIRECT_DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
```

Notes

- The Prisma `datasource db` is configured to use `url` and `directUrl` so you can use Accelerate in runtime while running migrations against a direct PostgreSQL URL.
- If deploying to Vercel, set the same environment variables in your Vercel Project Settings.

## Database (Prisma + PostgreSQL)

Prisma schema: see `prisma/schema.prisma`.

Key models

- `Category` — groups foods
- `Food` — nutrition fields (calories, protein, fat, carbohydrates, fiber, sugar)
- `ServingUnit` — e.g., gram, cup; linked via `FoodServingUnit`
- `FoodServingUnit` — mapping Food ↔ ServingUnit with grams
- `User` — role-based (USER/ADMIN) with `meals`
- `Meal` — has many `mealFoods` and belongs to a `user`
- `MealFood` — junction of Meal and Food with `amount` and `servingUnit`

Common commands

```powershell
# Generate Prisma Client (after schema edits)
npm run db:generate

# Create/apply migrations (development)
npm run db:migrate

# Open Prisma Studio (DB viewer)
npm run db:studio

# (Optional) Seed (if prisma/seed.ts exists)
npm run db:seed
```

If migrating from SQLite to PostgreSQL

1. Ensure `provider = "postgresql"` in `prisma/schema.prisma` and `directUrl` is set.
2. Provide a valid `DIRECT_DATABASE_URL` in `.env.local`.
3. Recreate migrations for the new database if needed, then run `npm run db:migrate`.

## Development

```powershell
# Start dev server
npm run dev

# Lint
npm run lint

# Type-check is built into Next.js build
npm run build
```

Application URL: http://localhost:3000

## UI/UX

- Built using Radix UI primitives and custom components under `src/components/ui/*`.
- Icons via `lucide-react`.
- Toasts via `sonner`.
- Theme support via `next-themes`.

## Data & State

- React Query (TanStack Query v5) for server state: caching, background refetch, mutations.
- Zustand for client state (filters, dialogs, selections).
- Zod schemas validate forms and query parameters; React Hook Form handles inputs.

## Auth

- NextAuth v5 beta. Configure providers under `src/app/api/auth/[...nextauth]` (if present).
- Requires `AUTH_SECRET` in `.env.local`.

## Development Scripts

```json
"scripts": {
	"dev": "next dev --turbopack",
	"build": "next build --turbopack",
	"start": "next start",
	"lint": "eslint",
	"db:migrate": "prisma migrate dev",
	"db:studio": "prisma studio",
	"db:generate": "prisma generate",
	"db:seed": "tsx prisma/seed.ts"
}
```

## Deployment (Vercel)

1. Push code to GitHub
2. Import the repo into Vercel
3. Add environment variables (`AUTH_SECRET`, `DATABASE_URL`, and `DIRECT_DATABASE_URL` if using Accelerate)
4. Deploy

Using Vercel CLI:

```powershell
# Login and deploy
vercel
vercel --prod
```

## API Overview (App Router)

- Route handlers live under `src/app/api/*` (e.g., `api/auth/[...nextauth]`).
- Server actions or server‑only modules in `src/lib`/page components call Prisma.
- Inputs validated with Zod; Prisma types shape responses.

## Data Model Summary

- Category 1—\* Food
- Food _—_ ServingUnit via FoodServingUnit (grams per unit)
- User 1—\* Meal
- Meal 1—_ MealFood; MealFood _—1 Food; MealFood \*—1 ServingUnit

This enables precise serving conversions and accurate nutrition totals per meal item.

## Troubleshooting

- Prisma on Windows: If you see a file lock error like `query_engine-windows.dll.node` being in use, close running Node/Next processes, then regenerate:
  ```powershell
  Get-Process | Where-Object { $_.ProcessName -like "*node*" -or $_.ProcessName -like "*prisma*" } | Stop-Process -Force
  npm run db:generate
  ```
- Prisma Migrate requires a direct Postgres URL. If `DATABASE_URL` uses `prisma+postgres://` (Accelerate), ensure `DIRECT_DATABASE_URL` is set and included in `datasource db` as `directUrl`.
- Tailwind CSS v4 uses PostCSS plugin `@tailwindcss/postcss`; ensure `postcss.config.mjs` is present.

## Quality & Tooling

- Type Safety: TypeScript `strict`, Prisma types, Zod at API boundaries
- Linting & Format: ESLint (`eslint-config-next`), Prettier + Tailwind plugin
- Build: Next.js with Turbopack; type checking included in build

## Roadmap

- Add tests (Vitest/RTL) for services and key components
- RBAC refinements for admin vs user permissions
- Export/import meal data, longitudinal nutrition analytics
- Additional NextAuth providers (OAuth)

## Packages

Runtime:

- `next`, `react`, `react-dom`, `next-auth`
- `@tanstack/react-query`, `zustand`, `immer`, `fast-deep-equal`
- `@prisma/client` (generated into `generated/prisma`)
- `zod`, `zod-validation-error`, `react-hook-form`, `@hookform/resolvers`
- `tailwind-merge`, `lucide-react`, `sonner`, `motion`, `vaul`
- `date-fns`, `clsx`, `class-variance-authority`, `server-only`

Dev:

- `prisma`, `typescript`, `eslint`, `eslint-config-next`
- `prettier`, `prettier-plugin-tailwindcss`
- `tailwindcss`, `@tailwindcss/postcss`
- `tsx`, `@types/*`

Install all dependencies

```powershell
npm install
```

Install specific tools (optional)

```powershell
# Prisma CLI + Client
npm install -D prisma
npm install @prisma/client

# React Query, Zustand, Forms & Zod
npm install @tanstack/react-query zustand react-hook-form zod @hookform/resolvers

# UI/Styling
npm install tailwindcss @tailwindcss/postcss lucide-react sonner clsx class-variance-authority tailwind-merge

# Auth
npm install next-auth
```

## License

No license file is included. Add one (e.g., MIT) if you plan to distribute or open‑source this project.
