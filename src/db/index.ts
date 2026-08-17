import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import pkg from 'pg';
import * as schema from './schema.ts';

const { Pool } = pkg;

// Add global connection pool caching to persist across hot-reloads
declare global {
  var _postgresPool: InstanceType<typeof Pool> | undefined;
  var _drizzleDb: any | undefined;
  var _pgliteClient: PGlite | undefined;
}

// Function to create or retrieve DB instance
export const initDatabase = () => {
  if (!global._drizzleDb) {
    if (process.env.SQL_HOST) {
      const pool = new Pool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB_NAME,
        max: 10,
        connectionTimeoutMillis: 15000,
      });
      pool.on('error', (err) => {
        console.error('Unexpected error on idle SQL pool client:', err);
      });
      global._postgresPool = pool;
      global._drizzleDb = drizzlePg(pool, { schema });
    } else {
      if (!global._pgliteClient) {
        global._pgliteClient = new PGlite('./.pgdata');
      }
      const client = global._pgliteClient;

      // Initialize table DDL schemas in PostgreSQL WASM instance
      client.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          uid TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS gallery (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          image_data TEXT,
          story TEXT,
          date TEXT,
          likes INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          price INTEGER NOT NULL,
          original_price INTEGER,
          rating TEXT,
          reviews_count INTEGER,
          description TEXT NOT NULL,
          features TEXT,
          dimensions TEXT,
          crafting_time TEXT,
          customizable_options TEXT,
          is_best_seller INTEGER DEFAULT 0,
          is_new_arrival INTEGER DEFAULT 0,
          is_active INTEGER DEFAULT 1,
          resin_clarity TEXT,
          image_data TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active INTEGER DEFAULT 1;
        CREATE TABLE IF NOT EXISTS testimonials (
          id TEXT PRIMARY KEY,
          author TEXT NOT NULL,
          role TEXT NOT NULL,
          location TEXT NOT NULL,
          content TEXT NOT NULL,
          product_ordered TEXT NOT NULL,
          rating INTEGER NOT NULL DEFAULT 5,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS cart_items (
          id SERIAL PRIMARY KEY,
          session_id TEXT NOT NULL,
          product_id TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          customizations TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          session_id TEXT NOT NULL,
          customer_name TEXT,
          email TEXT,
          total_amount INTEGER NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER NOT NULL,
          product_id TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          price_at_time INTEGER NOT NULL,
          customizations TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ALTER TABLE orders ADD COLUMN IF NOT EXISTS reference_image TEXT;
      `).catch(console.error);

      global._drizzleDb = drizzlePglite(client, { schema });
    }
  }
  return global._drizzleDb;
};

export const createPool = () => {
  if (!global._postgresPool) {
    initDatabase();
  }
  return global._postgresPool;
};

// Initialize Drizzle with the pool or PGlite and schema
export const db = initDatabase();
