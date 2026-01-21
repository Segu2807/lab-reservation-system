import express from 'express';
import cors from 'cors';
import notificationRoutes from './routes/notifications.routes';
import health from './health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/notifications', notificationRoutes);

export default app;
