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
import { addresses } from "./addresses";
import { relations } from "drizzle-orm";
import { files } from "./files";
import { filesToOrders } from "./files_to_orders";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  status: varchar("status", { length: 255 }).default("planned"),
  notes: varchar("notes", { length: 255 }),
  price: varchar("price", { length: 255 }),
  isPricePaid: boolean("is_price_paid").default(false),
  dateOfCompletion: date("date_of_completion"),
  // address: integer("address").references(()=> addresses.id),

  // spreadsheets: text('spreadsheet[]_undefined'),
  // designs: text('design[]_undefined'),
  // emails: text('emailmessage[]_undefined'),
  // products: text('product[]_undefined'),
  // employees: text('user[]_undefined'),
  // files: text('file[]_undefined'),
  workTime: doublePrecision("work_time"),
  // client: text('client_id)').references(()=> client.id),
  // address: text('typeaddress_id)').references(()=> address.id),
  // clientId: integer("client_id"),
  addressId: integer("address_id"),
  ...metadata,
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  address: one(addresses, {
    fields: [orders.addressId],
    references: [addresses.id],
  }),
  filesToOrders: many(filesToOrders),
}));