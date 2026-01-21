import express from 'express';
import cors from 'cors';
import reservationsRoutes from './routes/reservations.routes';
import health from './health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/reservations', reservationsRoutes);

export default app;
