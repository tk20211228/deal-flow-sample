import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { nanoid } from "nanoid";
import { getBaseURL } from "./get-base-url";
import { anonymous } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  baseURL: getBaseURL(),
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
    usePlural: true, // use plural for table names
  }),
  advanced: {
    database: {
      generateId: () => nanoid(),
    },
  },
  plugins: [anonymous(), nextCookies()],
});
