import express from 'express';
import cors from 'cors';
import routes from './routes';
import health from './health';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', health);
app.use('/users', routes);

export default app;
