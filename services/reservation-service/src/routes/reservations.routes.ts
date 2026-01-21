import { Router } from 'express';
import { pool } from '../db';
import { producer } from '../kafka';

const router = Router();

/**
 * GET /reservations/me
 */
router.get('/me', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM reservations ORDER BY created_at DESC'
  );
  res.json(rows);
});

/**
 * POST /reservations
 */
router.post('/', async (req, res) => {
  const { labId, date, startTime, endTime } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO reservations
     (lab_id, date, start_time, end_time, status)
     VALUES ($1,$2,$3,$4,'PENDING')
     RETURNING *`,
    [labId, date, startTime, endTime]
  );

  await producer.connect();
  await producer.send({
    topic: 'reservation-created',
    messages: [{ value: JSON.stringify(rows[0]) }]
  });
  await producer.disconnect();

  res.status(201).json(rows[0]);
});

export default router;
