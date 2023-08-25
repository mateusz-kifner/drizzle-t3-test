import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { email_credentials } from "./email_credentials";

export const email_credentials_to_users = pgTable(
  "email_credentials_to_users",
  {
    emailCredentialsId: integer("order_id")
      .notNull()
      .references(() => email_credentials.id),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    pk: primaryKey(t.emailCredentialsId, t.userId),
  }),
);

export const email_credentials_to_users_relations = relations(
  email_credentials_to_users,
  ({ one }) => ({
    emailCredentials: one(email_credentials, {
      fields: [email_credentials_to_users.emailCredentialsId],
      references: [email_credentials.id],
    }),
    users: one(users, {
      fields: [email_credentials_to_users.userId],
      references: [users.id],
    }),
  }),
);
