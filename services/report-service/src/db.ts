import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST || 'postgres-report',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'report_db',
  port: 5432
});

export const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reservation_reports (
      id SERIAL PRIMARY KEY,
      reservation_id UUID,
      lab_id UUID,
      user_id UUID,
      status VARCHAR(30),
      date DATE
    )
  `);
};
