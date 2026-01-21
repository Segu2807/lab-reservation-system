import express from 'express';
import cors from 'cors';
import labsRoutes from './routes/labs.routes';
import health from './health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/labs', labsRoutes);

export default app;
