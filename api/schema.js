import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Duplicate the schema within the API directory for safer access
export const squads = pgTable('squads', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  players: text('players').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: uuid('user_id'),
  updatedAt: timestamp('updated_at').defaultNow()
});