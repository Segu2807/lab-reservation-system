import express from 'express';
import cors from 'cors';
import availabilityRoutes from './routes/availability.routes';
import health from './health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/availability', availabilityRoutes);

export default app;
