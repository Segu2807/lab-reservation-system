import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 100,
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde',
  standardHeaders: 'draft-7', // o 'draft-6' o true
  legacyHeaders: false,
});