import { Database } from "@sqlitecloud/drivers";

const connectionString =
  "sqlitecloud://chqfzmardz.g1.sqlite.cloud:8860/aquarium.db?apikey=V5VTdgD66whIqKf2jDeNOm3THdaWuSqlmPmzL8afe3U";

let db: Database | null = null;

export const connectDB = async (): Promise<Database> => {
  if (db) return db;

  const newDb = new Database(connectionString);

  // 👇 force test connection
  await newDb.sql`SELECT 1`;

  // 👇 force types to allow await
  (newDb.sql as any) = async (...args: any[]) => {
    const result = await (Database.prototype.sql as any).apply(newDb, args);
    return result;
  };

  db = newDb;
  console.log("✅ Connected to SQLite Cloud successfully");
  return db;
};
