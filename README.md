# WCA Mentor

A personal AI mentor and development journal for **World Class Academy** students: quarterly goals, a mountain-biking progression journal, academic tracking, private reflections, and an AI mentor (Claude) that uses the student's own saved data to help them plan and follow through.

**Stack:** Expo SDK 57 · React Native 0.86 · TypeScript (strict) · Expo Router (native tabs) · TanStack Query · React Hook Form + Zod · Supabase (Auth, Postgres + RLS, Edge Functions) · Anthropic Messages API.

> Status: functional MVP, not yet run against live services or on a device. See [docs/STATUS.md](docs/STATUS.md) for exactly what has and hasn't been verified.

## Quick start

```bash
npm install
cp .env.example .env              # add your Supabase URL + publishable key
npx expo start                    # scan the QR code with Expo Go on your iPhone
```

Without a `.env` the app opens a **Configuration needed** screen — there is no fake backend.

### Backend (Supabase)

```bash
# Hosted project
npx supabase login
npx supabase link --project-ref <your-ref>
npx supabase db push                                   # apply migrations
cp supabase/functions/.env.example supabase/functions/.env   # add ANTHROPIC_API_KEY
npx supabase secrets set --env-file supabase/functions/.env
npx supabase functions deploy mentor-chat delete-account

# Optional synthetic demo student
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... DEMO_PASSWORD=... npx tsx scripts/seed-demo.ts --allow-remote
```

Local alternative (requires Docker): `npx supabase start`, then point `.env` at `http://127.0.0.1:54321`.

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Expo dev server |
| `npm run check` | typecheck + lint + unit/component tests |
| `npm test` | Jest: app (jest-expo) + server (mentor logic) projects |
| `npm run test:db` | Starts a throwaway Postgres, applies migrations, runs RLS tests (needs Postgres 16 binaries) |
| `npm run test:functions` | `deno check` the Edge Functions (needs Deno) |
| `npm run export:ios` | Production iOS JS bundle (sanity check) |

## Project map

- `src/app/` — screens (Expo Router). Tabs: **Today, Mentor, Goals, Riding, Growth** (academics lives in Growth).
- `src/components/ui/` — design system. `src/theme/` — tokens.
- `src/domain/` — pure logic and Zod schemas. `src/data/` — Supabase access hooks.
- `supabase/migrations/` — schema + RLS. `supabase/functions/` — `mentor-chat`, `delete-account`.
- `supabase/tests/` — RLS tests (real Postgres) and mentor tests.

## Docs

- [Architecture & data model](docs/ARCHITECTURE.md)
- [Privacy, safety & compliance notes](docs/PRIVACY_AND_SAFETY.md) — read before any real student uses the app
- [Release / TestFlight / App Store](docs/RELEASE.md)
- [Implementation status & test results](docs/STATUS.md)

## Ground rules

- Secrets (Anthropic key, Supabase service role) live **only** in Edge Function secrets. `EXPO_PUBLIC_*` values are public.
- Synthetic data only in development, demos and App Review.
- Authorization is enforced by RLS, not by hiding UI.
- Nothing is published to the App Store without WCA's explicit approval and completion of the consent/privacy checklist.
