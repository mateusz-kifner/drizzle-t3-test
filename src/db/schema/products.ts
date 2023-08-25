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
import { orders_to_products } from "./orders_to_products";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique(),
  category: varchar("category", { length: 255 }),
  description: text("description"),
  iconId: integer("iconId"),
  ...metadata,
});

export const productsRelations = relations(products, ({ one, many }) => ({
  orders: many(orders_to_products),
}));
