import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { files } from "./files";
import { orders } from "./orders";

export const filesToOrders = pgTable('files_to_orders', {
	fileId: integer('file_id').notNull().references(() => files.id),
	orderId: integer('order_id').notNull().references(() => orders.id),
}, (t) => ({
	pk: primaryKey(t.fileId, t.orderId),
}),
);

export const filesToOrdersRelations = relations(filesToOrders, ({ one }) => ({
	orders: one(orders, {
		fields: [filesToOrders.orderId],
		references: [orders.id],
	}),
	files: one(files, {
		fields: [filesToOrders.fileId],
		references: [files.id],
	}),
}));