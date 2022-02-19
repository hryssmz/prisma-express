import dotenv from "dotenv";

dotenv.config();

// NODE_ENV
if (!process.env.NODE_ENV) {
  throw new Error("Environment variable NODE_ENV is not set!");
}
export const NODE_ENV = process.env.NODE_ENV;

// HOST
export const HOST = process.env.HOST || "0.0.0.0";

// PORT
export const PORT = Number(process.env.PORT || "3000");
