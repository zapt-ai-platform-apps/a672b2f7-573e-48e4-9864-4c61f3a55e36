import { authenticateUser } from './_apiUtils';
import Sentry from './_sentry';
import { eq, and } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { squads } from '../drizzle/schema';

interface ApiRequest {
  query: Record<string, string | string[]>;
  method: string;
  body: any;
  headers: Record<string, string>;
}

interface ApiResponse {
  status: (statusCode: number) => ApiResponse;
  json: (body: any) => void;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  try {
    const user = await authenticateUser(req);
    const client = postgres(process.env.COCKROACH_DB_URL as string);
    const db = drizzle(client);
    
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Squad ID is required' });
    }
    
    const squadId = parseInt(Array.isArray(id) ? id[0] : id);
    
    if (req.method === 'GET') {
      const result = await db.select()
        .from(squads)
        .where(and(
          eq(squads.id, squadId),
          eq(squads.userId, user.id)
        ));
      
      if (!result.length) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      return res.status(200).json(result[0]);
    } else if (req.method === 'PUT') {
      const squadData = req.body;
      const result = await db.update(squads)
        .set(squadData)
        .where(and(
          eq(squads.id, squadId),
          eq(squads.userId, user.id)
        ))
        .returning();
      
      if (!result.length) {
        return res.status(404).json({ error: 'Squad not found' });
      }
      return res.status(200).json(result[0]);
    } else if (req.method === 'DELETE') {
      const result = await db.delete(squads)
        .where(and(
          eq(squads.id, squadId),
          eq(squads.userId, user.id)
        ))
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