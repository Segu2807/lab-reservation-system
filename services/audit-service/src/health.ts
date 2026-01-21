import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ status: 'UP', service: 'audit-service' });
});

export default router;
