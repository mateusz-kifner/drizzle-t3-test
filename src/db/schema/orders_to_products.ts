import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { products } from "./products";
import { orders } from "./orders";

export const ordersToProducts = pgTable(
  "orders_to_products",
  {
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
  },
  (t) => ({
    pk: primaryKey(t.orderId, t.productId),
  }),
);

export const ordersToProductsRelations = relations(
  ordersToProducts,
  ({ one }) => ({
    orders: one(orders, {
      fields: [ordersToProducts.orderId],
      references: [orders.id],
    }),
    products: one(products, {
      fields: [ordersToProducts.productId],
      references: [products.id],
    }),
  }),
);
