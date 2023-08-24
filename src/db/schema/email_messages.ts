import { integer, json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { metadata } from "./metadata";

export const email_messages = pgTable("email_messages", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 255 }),
  from: varchar("from", { length: 255 }),
  to: varchar("to", { length: 255 }),
  date: timestamp("date",{precision:6}),
  html: text("html"),
  text: text("text"),
  messageId: varchar("message_id", { length: 255 }),
  messageUid: integer("message_uid"),
  mailbox: varchar("mailbox"),
  clientUser: varchar("client_user"),
  headerLines: json("header_lines").default([]),
  textAsHtml: text("text_as_html"),
  ...metadata
  })