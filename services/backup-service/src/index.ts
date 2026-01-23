import express from "express";
import backupRoutes from "./routes/backup.routes";
import { startBackupCron } from "./cron/backup.cron";

async function bootstrap() {
  startBackupCron();
}

bootstrap();

const app = express();
app.use(express.json());

app.use("/backup", backupRoutes);

// 🔥 inicia cron
startBackupCron();

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Backup service running on port ${PORT}`);
});

