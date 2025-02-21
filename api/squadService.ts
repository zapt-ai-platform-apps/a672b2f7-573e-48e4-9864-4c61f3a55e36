import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { AuthUser } from './_apiUtils.ts';
import { squads } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm/expressions';
import db from '../lib/db';
import { parsePlayers } from '../src/utils/parsePlayers';

export async function handleGet(user: AuthUser, req: VercelRequest, res: VercelResponse): Promise<void> {
  const result = await db.select().from(squads).where(eq(squads.userId, user.id));
  const squadsData = result.map((row: Record<string, unknown>) => ({
    ...row,
    players: parsePlayers(row.players as string | unknown[])
  }));
  res.status(200).json(squadsData);
}

export async function handlePost(user: AuthUser, req: VercelRequest, res: VercelResponse): Promise<void> {
  const { name, players } = req.body as { name?: string; players?: unknown };
  if (!name || !players) {
    res.status(400).json({ error: 'Name and players are required' });
    return;
  }
  const insertResult = await db.insert(squads).values({
    userId: user.id,
    name,
    players: JSON.stringify(players)
  }).returning();
  const insertedSquad = insertResult[0] as Record<string, unknown>;
  res.status(200).json({ ...insertedSquad, players: parsePlayers(insertedSquad.players as string | unknown[]) });
}

export async function handlePut(user: AuthUser, req: VercelRequest, res: VercelResponse): Promise<void> {
  const { id, name, players } = req.body as { id?: number | string; name?: string; players?: unknown };
  if (!id || !name || !players) {
    res.status(400).json({ error: 'ID, name and players are required for update' });
    return;
  }
  const updateResult = await db.update(squads)
    .set({ name, players: JSON.stringify(players) })
    .where(eq(squads.id, id))
    .returning();
  const updatedSquad = updateResult[0] as Record<string, unknown>;
  res.status(200).json({ ...updatedSquad, players: parsePlayers(updatedSquad.players as string | unknown[]) });
}