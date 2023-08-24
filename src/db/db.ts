import { env } from "@/env.mjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as addressesSchema from "./schema/addresses";
import * as clientsSchema from "./schema/clients";
import * as designsSchema from "./schema/designs";
import * as spreadsheetsSchema from "./schema/spreadsheets";
import * as filesSchema from "./schema/files";
import * as ordersSchema from "./schema/orders";
import * as productsSchema from "./schema/products";
import * as usersSchema from "./schema/users";
import * as emailMessagesSchema from "./schema/email_messages";
import * as expensesSchema from "./schema/expenses";
import * as filesToOrdersSchema from "./schema/files_to_orders";

// for migrations
const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
export const migrationDb = drizzle(migrationClient);

// for query purposes
const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, {
  schema: {
    ...addressesSchema,
    ...clientsSchema,
    ...designsSchema,
    ...emailMessagesSchema,
    ...filesSchema,
    ...filesToOrdersSchema,
    ...productsSchema,
    ...ordersSchema,
    ...expensesSchema,
    ...usersSchema,
    ...spreadsheetsSchema,
  },
});
