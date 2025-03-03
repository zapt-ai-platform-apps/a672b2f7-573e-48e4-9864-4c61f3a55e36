import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const squads = pgTable('squads', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const squadPlayers = pgTable('squad_players', {
  id: serial('id').primaryKey(),
  squadId: integer('squad_id').references(() => squads.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});