// env
require("dotenv").config();

export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT || "");

//hashing
export const SALT_ROUNDS = process.env?.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS)
  : 10;

//jwt
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
