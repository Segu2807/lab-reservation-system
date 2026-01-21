import { Router } from 'express';
import { pool } from '../db';
import { redis } from '../redis';

const router = Router();

/**
 * GET /availability/check
 */
router.get('/check', async (req, res) => {
  const { labId, date, timeSlot } = req.query;

  const cacheKey = `availability:${labId}:${date}:${timeSlot}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.json(cached === 'true');
  }

  const { rows } = await pool.query(
    `SELECT 1 FROM availability
     WHERE lab_id=$1 AND date=$2 AND time_slot=$3`,
    [labId, date, timeSlot]
  );

  const available = rows.length === 0;

  await redis.set(cacheKey, String(available), { EX: 60 });

  res.json(available);
});

export default router;
