## Next-auth

This is a basic authentication for next-auth

## Getting Started

First, fill in a `.env` file and use the existing variables in `.env.example`

Second, install the dependencies:

```bash
pnpm install
```

Third, run the migration

```bash
pnpm prisma migrate dev --name create-database
```

Fourth, run the project

```bash
pnpm dev
```
