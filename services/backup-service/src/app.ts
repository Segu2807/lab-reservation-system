import express from "express";
import backupRoutes from "./routes/backup.routes";
import { health } from "./health";

const app = express();
app.use(express.json());

app.get("/health", health);
app.use("/backup", backupRoutes);

export default app;
