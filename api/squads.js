import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { authenticateUser } from './_apiUtils.js';
import { squads } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm/expressions';
import * as Sentry from '@sentry/node';

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    if (req.method === 'GET') {
      const result = await db.select().from(squads).where(eq(squads.userId, user.id));
      return res.status(200).json(result);
    } else if (req.method === 'POST') {
      const { name, players } = req.body;
      if (!name || !players) {
        return res.status(400).json({ error: 'Name and players are required' });
      }
      const insertResult = await db.insert(squads).values({
        userId: user.id,
        name,
        players,
      }).returning();
      return res.status(200).json(insertResult);
    } else if (req.method === 'PUT') {
      const { id, name, players } = req.body;
      if (!id || !name || !players) {
        return res.status(400).json({ error: 'ID, name and players are required for update' });
      }
      const updateResult = await db.update(squads)
        .set({ name, players })
        .where(eq(squads.id, id))
        .returning();
      return res.status(200).json(updateResult);
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error in squad API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}