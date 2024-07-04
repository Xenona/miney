import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const category = sqliteTable("category", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const payment = sqliteTable("payment", {
  id: integer("id").primaryKey(),
  description: text("description"),
  categoryId: integer("categoryId").references(() => category.id),
  amount: integer('amount').notNull(),
  accountId: integer('accountId').references(() => account.id),
  timestamp: integer('timestamp', {mode: 'timestamp'}).notNull().default(sql`(unixepoch())`)
});

export const account = sqliteTable('account', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
})
