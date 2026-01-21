import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { pool, initDB } from '../db';
import { signToken } from '../jwt';

const router = Router();

initDB();

/**
 * POST /auth/register
 */
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    `INSERT INTO users (email, password, role)
     VALUES ($1, $2, $3)
     RETURNING id, email, role`,
    [email, hash, role || 'USER']
  );

  const token = signToken(rows[0]);

  res.json({ user: rows[0], token });
});

/**
 * POST /auth/login
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (!rows.length) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  res.json({
    user: { id: user.id, email: user.email, role: user.role },
    token
  });
});

export default router;

