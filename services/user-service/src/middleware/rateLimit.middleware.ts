// services/user-service/src/middleware/rateLimit.middleware.ts
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de solicitudes
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde'
});