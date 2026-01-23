import express from 'express';
import cors from 'cors';
import approvalRoutes from './routes/approval.routes';
import health from './health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/approvals', approvalRoutes);

export default app;
