import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { metadata } from "./metadata";
 
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  username: varchar('username', { length: 255 }),
  email: text("email"),
  emailVerified: timestamp('email_verified'),
  password: text("password"),
  image: text("image"),
  ...metadata
});

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type