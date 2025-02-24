import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.COCKROACH_DB_URL as string);
const db = drizzle(client);

export default db;