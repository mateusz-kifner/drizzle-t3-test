import { decimal, json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { metadata } from "./_metadata";
 

export const expenses = pgTable("expenses",{
  id: serial("id").primaryKey(),
  name: varchar("name",{length:255}),
  cost: decimal("cost",{precision:2,scale:10}),
  expenseData: json("expense_data").default([]),
...metadata
})