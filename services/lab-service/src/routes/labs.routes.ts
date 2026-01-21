import { Router } from 'express';
import { pool } from '../db';
import { producer } from '../kafka';

const router = Router();

/**
 * GET /labs
 */
router.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM labs ORDER BY id');
  res.json(rows);
});

/**
 * POST /labs
 */
router.post('/', async (req, res) => {
  const { name, description, capacity } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO labs (name, description, capacity, status)
     VALUES ($1,$2,$3,'ACTIVE') RETURNING *`,
    [name, description, capacity]
  );

  await producer.connect();
  await producer.send({
    topic: 'lab-created',
    messages: [{ value: JSON.stringify(rows[0]) }]
  });
  await producer.disconnect();

  res.status(201).json(rows[0]);
});

export default router;
