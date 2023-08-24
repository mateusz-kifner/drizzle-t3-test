import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from '@/db/schema/users';
import { env } from "@/env.mjs";
import { db } from "@/db/db";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .query(async ({  }) => {
      const allUsers = await db.select().from(users);

      return allUsers
    }),
  add: publicProcedure.input(z.object({name:z.string()})).mutation(async ({input:newUserData})=>{
    const newUser = await db.insert(users).values(newUserData);


    return newUser
  })
});
