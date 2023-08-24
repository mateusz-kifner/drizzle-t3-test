import { boolean, integer, pgTable, serial, text, timestamp, varchar,doublePrecision, date, json } from "drizzle-orm/pg-core";
import { metadata } from "./metadata";


export const spreadsheets = pgTable("spreadsheets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  data: json("data").default([]),
...metadata
  })