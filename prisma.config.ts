import { defineConfig } from "prisma/config";

try {
  process.loadEnvFile();
} catch {
  // .env file not present or Node version < 20.12, continue with existing env
}

const {
  DATABASE_HOST_ADDRESS,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

if (
  !DATABASE_HOST_ADDRESS ||
  !DATABASE_USER ||
  !DATABASE_PASSWORD ||
  !DATABASE_NAME
) {
  throw new Error(
    "Missing required environment variables: DATABASE_HOST_ADDRESS, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME",
  );
}

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    url: `mysql://${DATABASE_USER}:${encodeURIComponent(DATABASE_PASSWORD)}@${DATABASE_HOST_ADDRESS}/${DATABASE_NAME}`,
  },
});
