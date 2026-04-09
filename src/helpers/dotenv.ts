import dotenv from "dotenv";
dotenv.config();

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const IP = process.env.IP || "localhost";
export const PORT = process.env.PORT || 3000;
export const DATABASE_HOST_ADDRESS: string = requireEnv(
  "DATABASE_HOST_ADDRESS",
);
export const DATABASE_USER: string = requireEnv("DATABASE_USER");
export const DATABASE_PASSWORD: string = requireEnv("DATABASE_PASSWORD");
export const DATABASE_NAME: string = requireEnv("DATABASE_NAME");

export const validateEnv = (): void => {
  if (!IP || !PORT) {
    throw new Error("Missing required application environment variables!");
  }
};

validateEnv();
