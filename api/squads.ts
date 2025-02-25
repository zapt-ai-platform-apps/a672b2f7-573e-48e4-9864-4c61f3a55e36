import { authenticateUser } from "./_apiUtils.js";
import Sentry from "./_sentry.js";
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { squads } from '../drizzle/schema.js';

interface ApiRequest {
  method: string;
  query: Record<string, string | string[]>;
  body: any;
  headers: Record<string, string>;
}

interface ApiResponse {
  status: (statusCode: number) => ApiResponse;
  json: (body: any) => void;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  try {
    // Verify authentication
    const user = await authenticateUser(req);
    
    // Initialize database connection
    const client = postgres(process.env.COCKROACH_DB_URL as string);
    const db = drizzle(client);
    
    // Handle different HTTP methods
    if (req.method === 'GET') {
      const result = await db.select()
        .from(squads)
        .where(eq(squads.userId, user.id));
      
      return res.status(200).json(result);
    } else if (req.method === 'POST') {
      const squadData = req.body;
      
      if (!squadData.name) {
        return res.status(400).json({ error: 'Squad name is required' });
      }
      
      const result = await db.insert(squads).values({
        ...squadData,
        userId: user.id,
        createdAt: new Date()
      }).returning();
      
      return res.status(201).json(result[0]);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in squads endpoint:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}