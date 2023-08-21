import "dotenv/config";
import type { Config } from "drizzle-kit";

if (typeof process.env.DATABASE_URL !== "string") throw new Error("process.env.DATABASE_URL not set")
 
export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver:"pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  }
  
} satisfies Config;