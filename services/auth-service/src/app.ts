import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import health from './health';
import { register } from './metrics';
import { metricsMiddleware } from './middleware/metrics.middleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// 👉 Middleware de métricas
app.use(metricsMiddleware);

app.use('/health', health);
app.use('/auth', authRoutes);

// 👉 Endpoint Prometheus
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

export default app;


