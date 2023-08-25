import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  doublePrecision,
  date,
} from "drizzle-orm/pg-core";
import { metadata } from "./_metadata";
import { relations } from "drizzle-orm";
import { clients } from "./clients";

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  streetName: varchar("street_name", { length: 255 }),
  streetNumber: varchar("street_number", { length: 255 }),
  apartmentNumber: varchar("apartment_number", { length: 255 }),
  secondLine: varchar("second_line", { length: 255 }),
  postCode: varchar("post_code", { length: 255 }),
  city: varchar("city", { length: 255 }),
  province: varchar("province", { length: 255 }).default("pomorskie"),
  ...metadata,
});

export const addresses_relations = relations(addresses, ({ many }) => ({
  clients: many(clients),
}));
