import initSqlJs from 'sql.js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { logger } from '../utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'database.sqlite');

let db = null;

export const tables = {
  users: 'users',
  resources: 'resources',
  questions: 'questions',
  verses: 'verses',
  reference_links: 'reference_links'
};

const schemas = {
  users: `
    CREATE TABLE IF NOT EXISTS ${tables.users} (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  resources: `
    CREATE TABLE IF NOT EXISTS ${tables.resources} (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      content TEXT NOT NULL,
      metadata JSON,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  questions: `
    CREATE TABLE IF NOT EXISTS ${tables.questions} (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      answer TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  verses: `
    CREATE TABLE IF NOT EXISTS ${tables.verses} (
      id TEXT PRIMARY KEY,
      chapter_number INTEGER NOT NULL,
      verse_number INTEGER NOT NULL,
      text_uthmani TEXT NOT NULL,
      text_translation TEXT,
      page_number INTEGER,
      juz_number INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  reference_links: `
    CREATE TABLE IF NOT EXISTS ${tables.reference_links} (
      id TEXT PRIMARY KEY,
      question_id TEXT NOT NULL,
      resource_id TEXT NOT NULL,
      metadata JSON,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (question_id) REFERENCES ${tables.questions}(id) ON DELETE CASCADE,
      FOREIGN KEY (resource_id) REFERENCES ${tables.resources}(id) ON DELETE CASCADE
    )
  `
};

export async function initializeDatabase() {
  if (db) return db;

  try {
    const SQL = await initSqlJs({
      locateFile: file => join(__dirname, '..', '..', 'node_modules', 'sql.js', 'dist', file)
    });

    let buffer;
    try {
      buffer = readFileSync(DB_PATH);
    } catch (err) {
      buffer = new Uint8Array(0);
    }

    db = new SQL.Database(buffer);

    // Initialize tables
    Object.values(schemas).forEach(schema => {
      db.exec(schema);
    });

    // Save initial database
    const data = db.export();
    writeFileSync(DB_PATH, Buffer.from(data));

    logger.info('Database initialized successfully');
    return db;
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

export function query(sql, params = []) {
  const stmt = getDb().prepare(sql);
  const result = stmt.getAsObject(params);
  stmt.free();
  return result;
}

export function queryAll(sql, params = []) {
  const stmt = getDb().prepare(sql);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

export function run(sql, params = []) {
  const result = getDb().run(sql, params);
  
  // Save changes to file after each write operation
  const data = db.export();
  writeFileSync(DB_PATH, Buffer.from(data));
  
  return result;
}

export function transaction(queries) {
  const db = getDb();
  try {
    db.exec('BEGIN TRANSACTION');
    
    for (const { sql, params = [] } of queries) {
      db.run(sql, params);
    }
    
    db.exec('COMMIT');
    
    // Save changes after transaction
    const data = db.export();
    writeFileSync(DB_PATH, Buffer.from(data));
  } catch (error) {
    db.exec('ROLLBACK');
    logger.error('Transaction failed:', error);
    throw error;
  }
}