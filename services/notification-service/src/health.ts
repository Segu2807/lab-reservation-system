import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ status: 'UP', service: 'notification-service' });
});

export default router;
