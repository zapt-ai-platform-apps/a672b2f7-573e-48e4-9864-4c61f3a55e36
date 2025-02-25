import { authenticateUser } from './_apiUtils.js';
import Sentry from '../lib/sentry';
import { getDb } from '../lib/db';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const db = getDb();
    const { squads } = await import('../drizzle/schema.js');
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Squad ID is required' });
    }
    if (req.method === 'GET') {
      const result = await db.select()
        .from(squads)
        .where(eq(squads.id, parseInt(id)))
        .where(eq(squads.userId, user.id));
      if (!result.length) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      return res.status(200).json(result[0]);
    } else if (req.method === 'PUT') {
      const squadData = req.body;
      const result = await db.update(squads)
        .set(squadData)
        .where(eq(squads.id, parseInt(id)))
        .where(eq(squads.userId, user.id))
        .returning();
      if (!result.length) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      return res.status(200).json(result[0]);
    } else if (req.method === 'DELETE') {
      const result = await db.delete(squads)
        .where(eq(squads.id, parseInt(id)))
        .where(eq(squads.userId, user.id))
        .returning();
      if (!result.length) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      return res.status(200).json({ message: 'Squad deleted successfully' });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in squadService endpoint:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}