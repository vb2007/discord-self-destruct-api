# Prisma

Short guide for using Prisma & it's main commands in this project.

## Command Executions

```sh
# 1. Generate the Prisma client (after any schema change)
pnpm db:generate

# 2a. Create and apply a new migration (development)
pnpm db:migrate

# 2b. Apply existing migrations without creating new ones (production)
pnpm db:deploy

# 3. Seed the database (optional, run once)
pnpm db:seed
```

## Using Generated Types

```ts
import { PrismaClient } from "../generated/prisma";
import type { User, Message } from "../generated/prisma";

const prisma = new PrismaClient();

//typed query examples
const user: User = await prisma.user.create({ ... });
const messages: Message[] = await prisma.message.findMany({ ... });
```

## View Data in browser

```sh
pnpm db:studio #Prisma Studio at http://localhost:5555
```

## After Editing `schema.prisma`

Always re-run `db:migrate` (dev) or `db:deploy` (prod), then `db:generate` to keep the client in sync with the schema.

## Fixing possible DB permission issues

When running `db:migrate`, I had an issue where the user lacked some SQL permissions for creating the shadown database.

"Bandaid" fix, but just grant all permissions to that user temporarly using the MariaDB CLI.

> [!CAUTION]
> **NEVER** use this in a production environment, as a user with all permissions can cause serious damage if its credentials are leaked from the deployed codebase.

```sql
GRANT ALL PRIVILEGES ON *.* TO '<devUser>'@'%';
FLUSH PRIVILEGES;
```
