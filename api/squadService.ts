import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { squads } from '../drizzle/schema.ts';
import { authenticateUser } from './_apiUtils.ts';
import { transformSquadFromDB } from '../src/models/squadModel.ts';
import * as Sentry from '@sentry/node';

export default async function handler(req, res) {
  try {
    // Check if ID is provided
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Squad ID is required' });
    }
    
    // Authenticate the user
    const user = await authenticateUser(req);
    
    // Initialize database connection
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Convert ID to number
    const squadId = parseInt(id);
    
    if (isNaN(squadId)) {
      return res.status(400).json({ error: 'Invalid squad ID' });
    }
    
    if (req.method === 'GET') {
      // Fetch a specific squad
      const result = await db.select()
        .from(squads)
        .where(eq(squads.id, squadId));
      
      if (result.length === 0) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      
      // Transform the result to ensure players are correctly parsed
      const transformedSquad = transformSquadFromDB(result[0]);
      
      console.log('API - Fetched and transformed squad:', { 
        id: transformedSquad.id, 
        name: transformedSquad.name, 
        playersType: typeof transformedSquad.players,
        playersArray: Array.isArray(transformedSquad.players),
        playersLength: Array.isArray(transformedSquad.players) ? transformedSquad.players.length : 'n/a'
      });
      
      res.status(200).json(transformedSquad);
    } else if (req.method === 'PUT') {
      // Update a squad
      const { name, players } = req.body;
      
      if (!name && !players) {
        return res.status(400).json({ error: 'At least one field to update is required' });
      }
      
      // Prepare update data
      const updateData = {};
      if (name) updateData.name = name;
      if (players) {
        updateData.players = typeof players === 'string' ? players : JSON.stringify(players);
        console.log('API - Updating squad players:', updateData.players);
      }
      
      const result = await db.update(squads)
        .set(updateData)
        .where(eq(squads.id, squadId))
        .returning();
      
      if (result.length === 0) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      
      // Transform the result for the response
      const transformedSquad = transformSquadFromDB(result[0]);
      
      res.status(200).json(transformedSquad);
    } else if (req.method === 'DELETE') {
      // Delete a squad
      const result = await db.delete(squads)
        .where(eq(squads.id, squadId))
        .returning();
      
      if (result.length === 0) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      
      res.status(200).json({ message: 'Squad deleted successfully' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}