import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { squads, squadPlayers } from '../../../../drizzle/schema.js';
import { eq, and } from 'drizzle-orm';
import { authenticateUser } from '../../../_apiUtils.js';
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

    // Get squadId and playerId from the URL
    const { squadId, playerId } = req.query;
    if (!squadId || !playerId) {
      return res.status(400).json({ error: 'Squad ID and Player ID are required' });
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

    // Handle DELETE method
    if (req.method === 'DELETE') {
      // Delete the player from the squad
      const result = await db.delete(squadPlayers)
        .where(and(
          eq(squadPlayers.id, parseInt(playerId)),
          eq(squadPlayers.squadId, parseInt(squadId))
        ));

      return res.status(200).json({ success: true });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in squad player API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}