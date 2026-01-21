import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import health from './health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/auth', authRoutes);

export default app;

