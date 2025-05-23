# my-better-t-app

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Router, Hono, ORPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **oRPC** - End-to-end type-safe APIs with OpenAPI integration
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **SQLite/Turso** - Database engine
- **Authentication** - Email & password authentication with Better Auth

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Database Setup

This project uses SQLite with Drizzle ORM.

1. Start the local SQLite database:

```bash
cd apps/server && bun db:local
```

2. Update your `.env` file in the `apps/server` directory with the appropriate connection details if needed.

3. Apply the schema to your database:

```bash
bun db:push
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

The API is running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
my-better-t-app/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   └── server/      # Backend API (Hono, ORPC)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI
- `cd apps/server && bun db:local`: Start the local SQLite database

IF I have a Sell/Send Currency locked in:
my recipients can have any buy Currencies
We don't make money off same currency transactions

Recipients have to be in the same COUNTRY and the Same CUrrency
Fixed CCY is; "Is the source of truth the send or recieve currency"

Recipients Bank Accounts need to be in the Buy Crurency

Settlement Method & Delivery method both have to be locked in as BankAccount
