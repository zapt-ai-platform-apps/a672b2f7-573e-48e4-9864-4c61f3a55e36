import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as Sentry from '@sentry/node';

// Initialize database connection helper
export function initDb() {
  try {
    const connectionString = process.env.COCKROACH_DB_URL;
    if (!connectionString) {
      throw new Error('Database connection string is missing');
    }
    
    const client = postgres(connectionString);
    const db = drizzle(client);
    
    return { client, db };
  } catch (error) {
    console.error('Failed to initialize database connection:', error);
    Sentry.captureException(error);
    throw error;
  }
}