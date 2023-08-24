import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { metadata } from "./metadata";

export const client = pgTable("client", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }),
  firstname: varchar("firstname", { length: 255 }),
  lastname: varchar("lastname", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phoneNumber: varchar("phone_number", { length: 255 }),
  companyName: varchar("company_name", { length: 255 }),
  notes: text("notes"),
  ...metadata
  })