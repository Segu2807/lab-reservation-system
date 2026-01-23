import express from 'express';
import cors from 'cors';
import auditRoutes from './routes/audits.routes';
import health from './health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/audits', auditRoutes);

export default app;
