import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const squads = pgTable('squads', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const squadPlayers = pgTable('squad_players', {
  id: uuid('id').defaultRandom().primaryKey(),
  squadId: uuid('squad_id').references(() => squads.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});