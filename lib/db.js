import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.COCKROACH_DB_URL);
const db = drizzle(client);

export default db;