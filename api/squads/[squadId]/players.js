import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { squads, squadPlayers } from '../../../drizzle/schema.js';
import { eq, and } from 'drizzle-orm';
import { authenticateUser } from '../../_apiUtils.js';
import * as Sentry from '@sentry/node';

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

export default async function handler(req, res) {
  try {
    // Authenticate the user
    const user = await authenticateUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Initialize database client
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    // Get squadId from the URL
    const { squadId } = req.query;
    if (!squadId) {
      return res.status(400).json({ error: 'Squad ID is required' });
    }

    // Verify the squad belongs to the user
    const squadRecord = await db.select()
      .from(squads)
      .where(and(
        eq(squads.id, parseInt(squadId)),
        eq(squads.userId, user.id)
      ));

    if (squadRecord.length === 0) {
      return res.status(404).json({ error: 'Squad not found or access denied' });
    }

    // Handle different HTTP methods
    if (req.method === 'GET') {
      // Get all players for the squad
      const players = await db.select()
        .from(squadPlayers)
        .where(eq(squadPlayers.squadId, parseInt(squadId)));

      return res.status(200).json(players);
    } else if (req.method === 'POST') {
      // Add a new player to the squad
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Player name is required' });
      }

      const [result] = await db.insert(squadPlayers)
        .values({
          name,
          squadId: parseInt(squadId)
        })
        .returning();

      return res.status(201).json(result);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in squad players API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}