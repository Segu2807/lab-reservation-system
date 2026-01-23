import { Router } from 'express';
import { pool } from '../db';

const router = Router();

/**
 * GET /notifications/:userId
 */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const { rows } = await pool.query(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );

  res.json(rows);
});

/**
 * PUT /notifications/:id/read
 */
router.put('/:id/read', async (req, res) => {
  const { id } = req.params;

  await pool.query(
    `UPDATE notifications SET read = true WHERE id = $1`,
    [id]
  );

  res.json({ message: 'Notification marked as read' });
});

export default router;
