import { boolean, integer, pgTable, serial, text, timestamp, varchar,doublePrecision, date } from "drizzle-orm/pg-core";
import { metadata } from "./metadata";

export const orders = pgTable("orders", {
  id: integer("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  status: varchar("status", { length: 255 }).default("planned"),
  notes: varchar("notes", { length: 255 }),
  price: varchar("price", { length: 255 }),
  isPricePaid: boolean("is_price_paid").default(false),
  dateOfCompletion: date("date_of_completion"),
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
  // addressId: integer("address_id"),
...metadata
  })