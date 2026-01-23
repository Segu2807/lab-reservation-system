import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ status: 'UP', service: 'lab-service' });
});

export default router;