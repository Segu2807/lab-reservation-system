import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const signToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

