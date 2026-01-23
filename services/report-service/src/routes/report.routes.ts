import { Router } from 'express';
import { pool } from '../db';

const router = Router();

/**
 * GET /reports/summary
 */
router.get('/summary', async (_req, res) => {
  const { rows } = await pool.query(`
    SELECT
      status,
      COUNT(*) as total
    FROM reservation_reports
    GROUP BY status
  `);

  res.json(rows);
});

/**
 * GET /reports/by-lab/:labId
 */
router.get('/by-lab/:labId', async (req, res) => {
  const { labId } = req.params;

  const { rows } = await pool.query(
    `SELECT * FROM reservation_reports WHERE lab_id = $1`,
    [labId]
  );

  res.json(rows);
});

/**
 * GET /reports/by-date
 * ?from=2024-01-01&to=2024-12-31
 */
router.get('/by-date', async (req, res) => {
  const { from, to } = req.query;

  const { rows } = await pool.query(
    `SELECT * FROM reservation_reports
     WHERE date BETWEEN $1 AND $2`,
    [from, to]
  );

  res.json(rows);
});

export default router;
