import { initializeZapt } from '@zapt/zapt-js';
import { authenticateUser } from './_apiUtils.js'; // Note the .js extension for Vercel
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as Sentry from '@sentry/node';
import { eq } from 'drizzle-orm';

// Initialize Sentry for backend error logging
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
    // Verify authentication
    const user = await authenticateUser(req);
    
    // Initialize database connection
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Import schema with .js extension for Vercel
    const { squads } = await import('../drizzle/schema.js');
    
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
        created_at: new Date()
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