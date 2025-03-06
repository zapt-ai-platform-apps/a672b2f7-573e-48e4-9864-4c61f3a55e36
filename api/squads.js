import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { squads } from '../drizzle/schema.js';
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
  console.log('-------- API: squads.js --------');
  console.log(`Request Method: ${req.method}`);
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

    // Handle different HTTP methods
    if (req.method === 'GET') {
      console.log('Fetching all squads for user');
      // Get all squads for the user
      const result = await db.select()
        .from(squads)
        .where(eq(squads.userId, user.id));

      console.log(`Found ${result.length} squads for user ${user.id}`);
      return res.status(200).json(result);
    } else if (req.method === 'POST') {
      console.log('Creating new squad');
      const { name } = req.body;
      if (!name) {
        console.log('Squad name is required but was not provided');
        return res.status(400).json({ error: 'Squad name is required' });
      }

      console.log(`Creating squad with name: ${name} for user: ${user.id}`);
      const [result] = await db.insert(squads)
        .values({
          name,
          userId: user.id
        })
        .returning();

      console.log('Squad created successfully:', JSON.stringify(result, null, 2));
      return res.status(201).json(result);
    } else if (req.method === 'PUT' || req.method === 'PATCH') {
      console.log('Updating squad');
      const { id, name } = req.body;
      if (!id || !name) {
        console.log('Squad ID and name are required but were not provided');
        return res.status(400).json({ error: 'Squad ID and name are required' });
      }

      console.log(`Updating squad with ID: ${id} to name: ${name} for user: ${user.id}`);
      
      // Verify the squad belongs to the user
      const squadRecord = await db.select()
        .from(squads)
        .where(and(
          eq(squads.id, id),
          eq(squads.userId, user.id)
        ));

      if (squadRecord.length === 0) {
        console.log(`Squad not found or access denied: id=${id}, userId=${user.id}`);
        return res.status(404).json({ error: 'Squad not found or access denied' });
      }
      
      const [result] = await db.update(squads)
        .set({ name })
        .where(and(
          eq(squads.id, id),
          eq(squads.userId, user.id)
        ))
        .returning();

      console.log('Squad updated successfully:', JSON.stringify(result, null, 2));
      return res.status(200).json(result);
    } else {
      console.log(`Method not allowed: ${req.method}`);
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in squads API:', error);
    console.error('Stack trace:', error.stack);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    console.log('-------- API: squads.js - Request Completed --------');
  }
}