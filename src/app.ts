import { PrismaClient } from "../generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

export const prisma = new PrismaClient({ adapter });
