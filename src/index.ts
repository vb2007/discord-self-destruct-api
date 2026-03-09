import { PrismaClient } from "../generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter: PrismaMariaDb = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

export const prisma: PrismaClient = new PrismaClient({ adapter });
