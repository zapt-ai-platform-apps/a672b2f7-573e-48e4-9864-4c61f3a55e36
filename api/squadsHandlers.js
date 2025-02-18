import { squads } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm/expressions';
import db from '../lib/db.js';
import { parsePlayers } from '../src/utils/parsePlayers.js';

export async function handleGet(user, req, res) {
  const result = await db.select().from(squads).where(eq(squads.userId, user.id));
  const squadsData = result.map(row => ({
    ...row,
    players: parsePlayers(row.players)
  }));
  return res.status(200).json(squadsData);
}

export async function handlePost(user, req, res) {
  const { name, players } = req.body;
  if (!name || !players) {
    return res.status(400).json({ error: 'Name and players are required' });
  }
  const insertResult = await db.insert(squads).values({
    userId: user.id,
    name,
    players: JSON.stringify(players)
  }).returning();
  const insertedSquad = insertResult[0];
  return res.status(200).json({ ...insertedSquad, players: parsePlayers(insertedSquad.players) });
}

export async function handlePut(user, req, res) {
  const { id, name, players } = req.body;
  if (!id || !name || !players) {
    return res.status(400).json({ error: 'ID, name and players are required for update' });
  }
  const updateResult = await db.update(squads)
    .set({ name, players: JSON.stringify(players) })
    .where(eq(squads.id, id))
    .returning();
  const updatedSquad = updateResult[0];
  return res.status(200).json({ ...updatedSquad, players: parsePlayers(updatedSquad.players) });
}