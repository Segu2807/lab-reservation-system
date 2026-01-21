import { Router } from 'express';

const router = Router();

// GET /users
router.get('/', (_req, res) => {
  res.json([
    { id: 1, name: 'Admin', email: 'admin@lab.com' },
    { id: 2, name: 'Student', email: 'student@lab.com' }
  ]);
});

export default router;
