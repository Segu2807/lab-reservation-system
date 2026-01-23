import express from 'express';
import cors from 'cors';
import notificationRoutes from './routes/notifications.routes';
import health from './health';
import { consumeUserCreated } from './events/user.events';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/notifications', notificationRoutes);

// Iniciar consumidor RabbitMQ
consumeUserCreated().catch(err => console.error('Error en RabbitMQ:', err));

export default app;
