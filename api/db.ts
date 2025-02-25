import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export function createDbConnection() {
  const connectionString = process.env.COCKROACH_DB_URL as string;
  if (!connectionString) {
    throw new Error('Database connection string is missing');
  }
  
  const client = postgres(connectionString);
  return drizzle(client);
}