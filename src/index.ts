import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { PrismaClient } from "../generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import {
  validateEnv,
  IP,
  PORT,
  DATABASE_HOST_ADDRESS,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
} from "./helpers/dotenv";

validateEnv();

const corsOriginUrls: string[] = [];
const corsOptions: cors.CorsOptions = {
  origin: corsOriginUrls,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Express.js server started on http://${IP}:${PORT}`);
});

const adapter: PrismaMariaDb = new PrismaMariaDb({
  host: DATABASE_HOST_ADDRESS,
  database: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
});

export const prisma: PrismaClient = new PrismaClient({ adapter });
