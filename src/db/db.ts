import { env } from '@/env.mjs';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
 
// for migrations
const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
export const migrationDb: PostgresJsDatabase = drizzle(migrationClient);

 
// for query purposes
const queryClient = postgres(env.DATABASE_URL);
export const db: PostgresJsDatabase = drizzle(queryClient);