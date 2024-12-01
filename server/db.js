import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'database.sqlite'));

export function setupDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Resources table
  db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      content TEXT NOT NULL,
      metadata JSON,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Questions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      answer TEXT,
      references JSON,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export { db };