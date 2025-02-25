import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export function getDb() {
  const client = postgres(process.env.COCKROACH_DB_URL);
  return drizzle(client);
}