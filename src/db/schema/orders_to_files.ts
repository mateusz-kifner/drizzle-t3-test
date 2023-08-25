import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { files } from "./files";
import { orders } from "./orders";

export const ordersToFiles = pgTable(
  "orders_to_files",
  {
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id),
    fileId: integer("file_id")
      .notNull()
      .references(() => files.id),
  },
  (t) => ({
    pk: primaryKey(t.orderId, t.fileId),
  }),
);

export const ordersToFilesRelations = relations(ordersToFiles, ({ one }) => ({
  orders: one(orders, {
    fields: [ordersToFiles.orderId],
    references: [orders.id],
  }),
  files: one(files, {
    fields: [ordersToFiles.fileId],
    references: [files.id],
  }),
}));
