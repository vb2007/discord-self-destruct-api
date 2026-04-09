import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import { PrismaClient } from "../generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import dotenv from "dotenv";
dotenv.config();

const DATABASE_HOST_ADDRESS = process.env.DATABASE_HOST_ADDRESS;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

if (
  !DATABASE_HOST_ADDRESS ||
  !DATABASE_USER ||
  !DATABASE_PASSWORD ||
  !DATABASE_NAME
) {
  throw new Error("Missing required environment variables!");
}

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

const adapter: PrismaMariaDb = new PrismaMariaDb({
  host: DATABASE_HOST_ADDRESS,
  user: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

export const prisma: PrismaClient = new PrismaClient({ adapter });
