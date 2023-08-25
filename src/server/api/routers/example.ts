import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/db/schema/users";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { orders } from "@/db/schema/orders";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.query(async ({}) => {
    const allUsers = await db.select().from(users);

    return allUsers;
  }),
  orders: publicProcedure.query(async ({}) => {
    const allUsers = await db.query.orders.findFirst({
      where: eq(orders.id, 1),
      extras: {},
      with: {
        files: {
          with: { files: true },
          columns: { fileId: false, orderId: false },
        },
      },
    });

    return allUsers;
  }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input: newUserData }) => {
      const newUser = await db.insert(users).values(newUserData);

      return newUser;
    }),
});
