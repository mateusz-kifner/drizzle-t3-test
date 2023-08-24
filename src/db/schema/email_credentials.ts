import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { metadata } from "./_metadata";

export const email_credentials = pgTable("email_credentials", {
  id: serial("id").primaryKey(),
  host: varchar("host", { length: 255 }),
  port: integer("port").notNull(),
  user: varchar("user", { length: 255 }),
  protocol: varchar("protocol", { length: 255 }).default("imap"),
  password: varchar("password", { length: 255 }),
  secure: boolean('boolean').default(true),
  ...metadata
  })