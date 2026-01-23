import { Router } from 'express';
import { pool } from '../db';
import { producer } from '../kafka';

const router = Router();

/**
 * GET /approvals/pending
 */
router.get('/pending', async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT * FROM approvals WHERE status='PENDING'`
  );
  res.json(rows);
});

/**
 * POST /approvals/:id/approve
 */
router.post('/:id/approve', async (req, res) => {
  const { id } = req.params;

  await pool.query(
    `UPDATE approvals SET status='APPROVED' WHERE id=$1`,
    [id]
  );

  await producer.connect();
  await producer.send({
    topic: 'reservation-approved',
    messages: [{ value: JSON.stringify({ approvalId: id }) }]
  });

  res.json({ approved: true });
});

/**
 * POST /approvals/:id/reject
 */
router.post('/:id/reject', async (req, res) => {
  const { id } = req.params;

  await pool.query(
    `UPDATE approvals SET status='REJECTED' WHERE id=$1`,
    [id]
  );

  await producer.connect();
  await producer.send({
    topic: 'reservation-rejected',
    messages: [{ value: JSON.stringify({ approvalId: id }) }]
  });

  res.json({ rejected: true });
});

export default router;
