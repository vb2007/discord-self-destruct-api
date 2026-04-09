import dotenv from "dotenv";
dotenv.config();

export const IP = process.env.IP || "localhost";
export const PORT = process.env.PORT || 3000;
export const DATABASE_HOST_ADDRESS = process.env.DATABASE_HOST_ADDRESS;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;

export const validateEnv = (): any => {
  if (!IP || !PORT) {
    throw new Error("Missing required application environment variables!");
  }

  if (
    !DATABASE_HOST_ADDRESS ||
    !DATABASE_USER ||
    !DATABASE_PASSWORD ||
    !DATABASE_NAME
  ) {
    throw new Error(
      "Missing required database configuration environment variables!",
    );
  }
};

validateEnv();
