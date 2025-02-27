import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { squads } from '../drizzle/schema.ts';
import { authenticateUser } from './_apiUtils.ts';
import { transformSquadFromDB } from '../src/models/squadModel.ts';
import * as Sentry from '@sentry/node';

export default async function handler(req, res) {
  try {
    // Authenticate the user
    const user = await authenticateUser(req);
    
    // Initialize database connection
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    if (req.method === 'GET') {
      // Fetch all squads for the user
      const result = await db.select().from(squads);
      
      // Transform the result to ensure players are correctly parsed
      const transformedSquads = result.map(squad => transformSquadFromDB(squad));
      
      console.log('API - Fetched and transformed squads:', 
        transformedSquads.map(s => ({ 
          id: s.id, 
          name: s.name, 
          playersType: typeof s.players,
          playersLength: Array.isArray(s.players) ? s.players.length : 'n/a'
        }))
      );
      
      res.status(200).json(transformedSquads);
    } else if (req.method === 'POST') {
      // Create a new squad
      const { name, players } = req.body;
      
      if (!name || !players) {
        return res.status(400).json({ error: 'Name and players are required' });
      }
      
      console.log('API - Creating squad with players:', players);
      
      const result = await db.insert(squads).values({
        name,
        players: typeof players === 'string' ? players : JSON.stringify(players),
      }).returning();
      
      if (result.length === 0) {
        return res.status(500).json({ error: 'Failed to create squad' });
      }
      
      // Transform the result for the response
      const transformedSquad = transformSquadFromDB(result[0]);
      
      res.status(201).json(transformedSquad);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}