import express from 'express';
import cors from 'cors';
import reservationsRoutes from './routes/reservations.routes';
import health from './health';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Swagger
app.use('/docs', swaggerUi.serve as any, swaggerUi.setup(swaggerSpec));

// 🔹 Routes
app.use('/health', health);
app.use('/reservations', reservationsRoutes);

export default app;

