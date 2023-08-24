import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { metadata } from "./metadata";

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  size: integer("size").notNull(),
  filepath: varchar("filepath", { length: 2048 }).notNull(),
  originalFilename: varchar("original_filename", { length: 1024 }),
  newFilename: varchar("new_filename", { length: 1024 }),
  filename: varchar("filename", { length: 1024 }),
  mimetype: varchar("mimetype", { length: 255 }),
  hash: varchar("hash", { length: 10 }),
  token: varchar("token", { length: 32 }),
  width: integer("width"),
  height: integer("height"),
  ...metadata
  })