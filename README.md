# seat-master

This repository contains a two-part application for creating and booking concert seats:

- `client/` — Next.js + React frontend
- `server/` — NestJS backend API

## Quick overview

This README explains how to run the app locally, the application architecture, notable libraries used, and how to run unit tests.

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (or any Postgres-compatible database) for the server
- Git (optional, for cloning)

On Windows, run these commands in PowerShell.

## Setup — clone and install

1. Clone the repo (if you haven't already):

```powershell
git clone <repo-url>
cd seat-master
```

2. Install dependencies for both client and server:

```powershell
cd client
npm install
cd ..\server
npm install
cd ..
```

3. Create a local database and provide a connection string.

You can use the example `.env.example` at the repository root as a starting point. Copy it to a `.env` file in the `server/` folder (or set environment variables in your shell):

```powershell
copy .\.env.example .\server\.env
```

Then edit `server/.env` (or set environment variables) to point to your Postgres instance.

Important env vars:

- `DATABASE_URL` — Full Postgres connection string, e.g. `postgresql://user:password@localhost:5432/seatmaster`
- `PORT` — Optional. Defaults to `5000` if not set.

Note: The server's `main.ts` enables CORS for `http://localhost:3000`. If you run the frontend on a different host/port, update the server CORS config in `server/src/main.ts`.

## Running the app locally

Start the server API (from project root):

```powershell
cd server
npm run start:dev
```

The server listens on the port specified in `PORT` or `5000` by default.

Start the client (in a new terminal):

```powershell
cd client
npm run dev
```

Open `http://localhost:3000` in your browser.

## Application architecture (high-level)

- Frontend (`client/`)
	- Built with Next.js (app directory) and React 19.
	- UI uses Tailwind CSS for styling and `react-icons` for icons.
	- The frontend calls the backend REST endpoints to create bookings and fetch concert data.
	- Context providers and custom hooks (under `src/context` and `src/hook`) manage state like reserves and bookings.

- Backend (`server/`)
	- Built with NestJS (modular architecture). Entry point is `src/main.ts`.
	- Database access is done via a small `DatabaseService` that wraps a `pg` Pool; connection string is read from `DATABASE_URL`.
	- APIs are organized under `src/api/` and split between admin and user endpoints.
	- Jest is configured for unit and e2e tests.

## Notable libraries and their role

- Client
	- `next` — Framework for React SSR and routing.
	- `react` / `react-dom` — UI library.
	- `tailwindcss` — Utility-first CSS framework used for styling.
	- `axios` — HTTP client used to call backend APIs.
	- `react-icons` — Icon components.

- Server
	- `@nestjs/*` — Structural framework for the API (controllers, modules, DI).
	- `pg` — Postgres client used by `DatabaseService`.
	- `jest`, `ts-jest`, `supertest` — Testing utilities (unit & e2e tests).

## Environment and configuration

- Server reads environment variables via `process.env`. The important ones are described above.
- `server/src/main.ts` sets default CORS origin to `http://localhost:3000`.

## Running tests

Server unit tests (and e2e) use Jest. From the `server` folder run:

```powershell
cd server
npm test

# or watch
npm run test:watch

# e2e tests
npm run test:e2e
```

Client tests: There are no client unit tests configured by default. You can add tests with your preferred framework (Jest/React Testing Library / Playwright for E2E).

## Development notes and tips

- If you prefer using `yarn` or `pnpm`, you can substitute `npm install` and `npm run` with the corresponding commands.
- For database setup, create the Postgres database and run any SQL migrations you manage locally (this project uses a lightweight `DatabaseService`; there are no migration files included in the repo root).
- Logs: the server prints a `Database connected successfully` message on successful DB connect.

## Troubleshooting

- PORT in use: If the server fails to start because the port is taken, change `PORT` in `.env` or kill the process using the port.
- DB connection fail: check `DATABASE_URL` credentials and that Postgres is running and reachable from your machine.

## Next steps / improvements

- Provide SQL migrations (e.g., with Prisma or TypeORM) for easier DB setup.
- Add client-side unit tests and CI scripts.
- Add a docker-compose for local setup of server + Postgres.

---

If you'd like, I can:

- Add a `docker-compose.yml` that starts Postgres, server, and client for local development.
- Add a `server/.env` loader example or script to copy `.env.example` automatically.

Tell me which of those you'd prefer and I can add it next.

## Database tables & pagination

Note: ฉันได้สร้างตาราง `bookings`, `concerts`, `history`, และ `users` ในฐานข้อมูล (ดู attachment / DB explorer screenshot). These are the main tables used by the app:

- `bookings` — store booking records referencing `users` and `concerts`.
- `concerts` — concert metadata (title, date, venue, capacity, etc.).
- `history` — administrative history/audit entries.
- `users` — user records.

Because datasets (for example `bookings` or `history`) may grow large, the app uses pagination on list endpoints and a reusable client-side Pagination component to render page controls. The client component is implemented at:

`client/src/app/admin/components/Pagination.tsx`

Server-side pagination (recommended)

We recommend implementing simple limit/offset pagination on the server (fast to add and easy to reason about). A minimal SQL pattern is:

```sql
-- count total rows
SELECT COUNT(*) FROM concerts;

-- fetch a single page (page indexed from 1)
-- limit = items per page, offset = (page - 1) * limit
SELECT * FROM concerts
ORDER BY id DESC
LIMIT $1 OFFSET $2; -- $1 = limit, $2 = offset
```

Example NestJS service pattern (pseudo-code)

```ts
// Accept page & limit from query params, default limit=20
const limit = Math.max(1, Math.min(Number(query.limit) || 20, 200));
const page = Math.max(1, Number(query.page) || 1);
const offset = (page - 1) * limit;

const data = await db.query('SELECT * FROM concerts ORDER BY id DESC LIMIT $1 OFFSET $2', [limit, offset]);
const [{ count }] = await db.query('SELECT COUNT(*) FROM concerts');
const total = Number(count);

return {
	data,
	meta: {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	},
};
```

API contract example

- Request: GET /api/admin/concerts?page=2&limit=20
- Response (200):

```json
{
	"data": [ /* array of concert objects for the requested page */ ],
	"meta": {
		"total": 345,
		"page": 2,
		"limit": 20,
		"totalPages": 18
	}
}
```

Client usage

- Use the `Pagination` component to render controls. When the user changes the page, call the API with the new `page` and `limit` query parameters and update the displayed list with `response.data` while reading pagination numbers from `response.meta`.

Indexing and performance tips

- Add indexes on columns you filter or sort by (for example `created_at`, `concert_id`, or `user_id`) to improve list query performance.
- For very large datasets or infinite-scroll patterns, consider cursor-based pagination instead of limit/offset to avoid performance issues with large offsets.

If you want, I can:

- Implement server-side pagination for the `concerts` and `history` endpoints now (I can modify the NestJS services to accept `page`/`limit` and return `{data, meta}`).
- Add SQL index suggestions or a simple seed script to generate test data.

Tell me which to do next and I'll implement the changes.
