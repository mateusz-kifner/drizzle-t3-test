import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from '@/db/schema/users';
import { env } from "@/env.mjs";

const client = postgres(env.DATABASE_URL);
const db = drizzle(client);

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .query(async ({  }) => {

      const allUsers = await db.select().from(users);

      return allUsers
    }),
});
