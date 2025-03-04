import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { squads, squadPlayers } from '../drizzle/schema.js';
import { eq, and } from 'drizzle-orm';
import { authenticateUser } from './_apiUtils.js';
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

    // Only accept POST requests for fixed-path API endpoint
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { action, squadId } = req.body;
    
    if (!action || !squadId) {
      return res.status(400).json({ error: 'Action and Squad ID are required' });
    }

    // Verify the squad belongs to the user before any operation
    const squadRecord = await db.select()
      .from(squads)
      .where(and(
        eq(squads.id, parseInt(squadId)),
        eq(squads.userId, user.id)
      ));

    if (squadRecord.length === 0) {
      return res.status(404).json({ error: 'Squad not found or access denied' });
    }

    // Handle different actions
    switch (action) {
      case 'getPlayers':
        // Get all players for the squad
        const players = await db.select()
          .from(squadPlayers)
          .where(eq(squadPlayers.squadId, parseInt(squadId)));

        return res.status(200).json(players);
        
      case 'addPlayer':
        const { name } = req.body;
        if (!name) {
          return res.status(400).json({ error: 'Player name is required' });
        }

        // Add player to the squad
        const [result] = await db.insert(squadPlayers)
          .values({
            name,
            squadId: parseInt(squadId)
          })
          .returning();

        return res.status(201).json(result);
        
      case 'removePlayer':
        const { playerId } = req.body;
        if (!playerId) {
          return res.status(400).json({ error: 'Player ID is required' });
        }

        // Delete the player from the squad
        await db.delete(squadPlayers)
          .where(and(
            eq(squadPlayers.id, parseInt(playerId)),
            eq(squadPlayers.squadId, parseInt(squadId))
          ));

        return res.status(200).json({ success: true });
        
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Error in squad players API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}