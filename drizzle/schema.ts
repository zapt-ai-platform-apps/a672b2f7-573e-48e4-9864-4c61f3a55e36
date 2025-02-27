import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const squads = pgTable('squads', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  players: text('players').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});