import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as Sentry from "@sentry/node";
import { squads } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

// Initialize Sentry
Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

// Initialize database connection
const client = postgres(process.env.COCKROACH_DB_URL || '');
const db = drizzle(client);

export default async function handler(req, res) {
  try {
    // GET /api/squads
    if (req.method === 'GET' && !req.query.id) {
      const allSquads = await db.select().from(squads);
      
      // Ensure all IDs are returned as numbers
      const squadsWithNumberIds = allSquads.map(squad => ({
        ...squad,
        id: typeof squad.id === 'string' ? parseInt(squad.id, 10) : squad.id
      }));
      
      return res.status(200).json(squadsWithNumberIds);
    }

    // GET /api/squads/:id
    if (req.method === 'GET' && req.query.id) {
      const id = parseInt(req.query.id, 10);
      const [squad] = await db.select().from(squads).where(eq(squads.id, id));
      
      if (!squad) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      
      // Ensure ID is returned as a number
      return res.status(200).json({
        ...squad,
        id: typeof squad.id === 'string' ? parseInt(squad.id, 10) : squad.id
      });
    }

    // POST /api/squads
    if (req.method === 'POST') {
      const { name, players } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Squad name is required' });
      }
      
      const [newSquad] = await db.insert(squads).values({
        name,
        players: JSON.stringify(players || [])
      }).returning();
      
      // Ensure ID is returned as a number
      return res.status(201).json({
        ...newSquad,
        id: typeof newSquad.id === 'string' ? parseInt(newSquad.id, 10) : newSquad.id
      });
    }

    // PUT /api/squads/:id
    if (req.method === 'PUT' && req.query.id) {
      const id = parseInt(req.query.id, 10);
      const { name, players } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Squad name is required' });
      }
      
      const [updatedSquad] = await db.update(squads)
        .set({
          name,
          players: JSON.stringify(players || [])
        })
        .where(eq(squads.id, id))
        .returning();
      
      if (!updatedSquad) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      
      // Ensure ID is returned as a number
      return res.status(200).json({
        ...updatedSquad,
        id: typeof updatedSquad.id === 'string' ? parseInt(updatedSquad.id, 10) : updatedSquad.id
      });
    }

    // DELETE /api/squads/:id
    if (req.method === 'DELETE' && req.query.id) {
      const id = parseInt(req.query.id, 10);
      await db.delete(squads).where(eq(squads.id, id));
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}