import { squads } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm/expressions';
import db from '../lib/db.js';
import { parsePlayers } from '../src/utils/parsePlayers.js';

/**
 * Handles GET requests for squads.
 * 
 * @param user - The authenticated user object.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns The response with squads data.
 */
export async function handleGet(user: any, req: any, res: any): Promise<any> {
  const result = await db.select().from(squads).where(eq(squads.userId, user.id));
  const squadsData = result.map(row => ({
    ...row,
    players: parsePlayers(row.players)
  }));
  return res.status(200).json(squadsData);
}

/**
 * Handles POST requests to create a new squad.
 *
 * @param user - The authenticated user object.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns The response with the created squad.
 */
export async function handlePost(user: any, req: any, res: any): Promise<any> {
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

/**
 * Handles PUT requests to update an existing squad.
 *
 * @param user - The authenticated user object.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns The response with the updated squad.
 */
export async function handlePut(user: any, req: any, res: any): Promise<any> {
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