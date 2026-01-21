import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST || 'postgres-notification',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'notifications',
  port: 5432
});

export const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      user_id UUID,
      message TEXT,
      type VARCHAR(50),
      read BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};
