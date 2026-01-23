import { Router } from 'express';
import { AuditModel } from '../mongo';

const router = Router();

/**
 * GET /audits
 */
router.get('/', async (_req, res) => {
  const audits = await AuditModel.find().sort({ createdAt: -1 }).limit(100);
  res.json(audits);
});

/**
 * GET /audits/:type
 */
router.get('/:type', async (req, res) => {
  const { type } = req.params;
  const audits = await AuditModel.find({ eventType: type });
  res.json(audits);
});

export default router;
