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
  console.log('-------- API: squads-players.js --------');
  console.log(`Request Method: ${req.method}`);
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  console.log('Request Headers:', JSON.stringify(req.headers, null, 2).replace(/(authorization": "Bearer ).+?"/g, '$1[REDACTED]"'));
  
  try {
    // Authenticate the user
    console.log('Authenticating user...');
    const user = await authenticateUser(req);
    if (!user) {
      console.log('Authentication failed: No user returned');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(`User authenticated: ${user.id}`);

    // Initialize database client
    console.log('Initializing database connection...');
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    console.log('Database connection initialized');

    // Only accept POST requests for fixed-path API endpoint
    if (req.method !== 'POST') {
      console.log(`Method not allowed: ${req.method}`);
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { action, squadId } = req.body;
    console.log(`Processing action: ${action} for squadId: ${squadId}`);
    
    if (!action || !squadId) {
      console.log('Missing required fields:', { action, squadId });
      return res.status(400).json({ error: 'Action and Squad ID are required' });
    }

    // Verify the squad belongs to the user before any operation
    console.log(`Verifying squad ${squadId} belongs to user ${user.id}...`);
    const squadRecord = await db.select()
      .from(squads)
      .where(and(
        eq(squads.id, parseInt(squadId)),
        eq(squads.userId, user.id)
      ));

    console.log(`Squad verification result:`, JSON.stringify(squadRecord, null, 2));

    if (squadRecord.length === 0) {
      console.log(`Squad not found or access denied: squadId=${squadId}, userId=${user.id}`);
      return res.status(404).json({ error: 'Squad not found or access denied' });
    }
    console.log('Squad verification successful');

    // Handle different actions
    switch (action) {
      case 'getPlayers':
        console.log(`Getting players for squadId: ${squadId}`);
        // Get all players for the squad
        const players = await db.select()
          .from(squadPlayers)
          .where(eq(squadPlayers.squadId, parseInt(squadId)));

        console.log(`Found ${players.length} players for squadId: ${squadId}`);
        console.log('Returning players:', JSON.stringify(players, null, 2));
        return res.status(200).json(players);
        
      case 'addPlayer':
        const { name } = req.body;
        console.log(`Adding player: name=${name}, squadId=${squadId}`);
        
        if (!name) {
          console.log('Player name is required but was not provided');
          return res.status(400).json({ error: 'Player name is required' });
        }

        // Add player to the squad
        console.log('Inserting player into database...');
        const [result] = await db.insert(squadPlayers)
          .values({
            name,
            squadId: parseInt(squadId)
          })
          .returning();

        console.log('Player added successfully:', JSON.stringify(result, null, 2));
        return res.status(201).json(result);
        
      case 'removePlayer':
        const { playerId } = req.body;
        console.log(`Removing player: playerId=${playerId}, squadId=${squadId}`);
        
        if (!playerId) {
          console.log('Player ID is required but was not provided');
          return res.status(400).json({ error: 'Player ID is required' });
        }

        // Delete the player from the squad
        console.log('Deleting player from database...');
        await db.delete(squadPlayers)
          .where(and(
            eq(squadPlayers.id, parseInt(playerId)),
            eq(squadPlayers.squadId, parseInt(squadId))
          ));

        console.log(`Player ${playerId} removed successfully from squad ${squadId}`);
        return res.status(200).json({ success: true });
        
      default:
        console.log(`Invalid action: ${action}`);
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Error in squad players API:', error);
    console.error('Stack trace:', error.stack);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('-------- API: squads-players.js - Request Completed --------');
  }
}