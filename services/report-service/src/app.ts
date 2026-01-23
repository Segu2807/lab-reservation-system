import express from 'express';
import cors from 'cors';
import reportRoutes from './routes/report.routes';
import health from './health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/reports', reportRoutes);

export default app;
