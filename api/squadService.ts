import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, desc } from 'drizzle-orm';
import { squads } from '../drizzle/schema.js';
import * as Sentry from '@sentry/node';

// Get database client
const getDbClient = () => {
  const connectionString = process.env.COCKROACH_DB_URL;
  if (!connectionString) {
    throw new Error('Database connection string not provided');
  }
  return postgres(connectionString);
};

export async function getSquads(userId = null) {
  try {
    const client = getDbClient();
    const db = drizzle(client);
    
    let query = db.select().from(squads).orderBy(desc(squads.createdAt));
    
    // If userId is provided, filter by user_id
    if (userId) {
      query = query.where(eq(squads.userId, userId));
    } else {
      // If no userId, only return public squads or apply appropriate public/private logic
      // This is a placeholder - implement according to your business logic
      // For example, you might have a `public` field in your squads table
      // query = query.where(eq(squads.public, true));
    }
    
    const result = await query;
    client.end();
    return result;
  } catch (error) {
    Sentry.captureException(error);
    console.error('Database error in getSquads:', error);
    throw new Error(`Failed to retrieve squads: ${error.message}`);
  }
}

// Add other squad-related database functions here