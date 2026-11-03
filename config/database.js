import pg from 'pg';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || join(dirname(__dirname), 'dreams.db');

let db = null;
let pool = null;

function toPostgresPlaceholders(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}

export async function getDatabase() {
  if (!db) {
    if (process.env.DATABASE_URL) {
      pool = new Pool({ connectionString: process.env.DATABASE_URL });
      db = {
        exec: async (sql) => pool.query(sql),
        all: async (sql, ...params) => {
          const result = await pool.query(toPostgresPlaceholders(sql), params);
          return result.rows;
        },
        get: async (sql, ...params) => {
          const result = await pool.query(toPostgresPlaceholders(sql), params);
          return result.rows[0];
        },
        run: async (sql, ...params) => {
          const isInsert = /^\s*INSERT\b/i.test(sql);
          const query = toPostgresPlaceholders(sql);
          const result = await pool.query(
            isInsert ? `${query} RETURNING id` : query,
            params
          );
          return { lastID: result.rows[0]?.id, changes: result.rowCount };
        }
      };
    } else {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });

      await db.exec('PRAGMA foreign_keys = ON');
    }
  }
  return db;
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
    db = null;
  } else if (db) {
    await db.close();
    db = null;
  }
}

export default { getDatabase, closeDatabase };
