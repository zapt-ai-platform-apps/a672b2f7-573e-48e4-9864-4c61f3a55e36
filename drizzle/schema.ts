import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const squads = pgTable('squads', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  name: text('name').notNull(),
  players: text('players').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});