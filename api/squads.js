import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { squads } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
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

    // Handle different HTTP methods
    if (req.method === 'GET') {
      // Get all squads for the user
      const result = await db.select()
        .from(squads)
        .where(eq(squads.userId, user.id));

      return res.status(200).json(result);
    } else if (req.method === 'POST') {
      // Create a new squad
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Squad name is required' });
      }

      const [result] = await db.insert(squads)
        .values({
          name,
          userId: user.id
        })
        .returning();

      return res.status(201).json(result);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in squads API:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}