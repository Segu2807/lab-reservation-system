import cron from "node-cron";
import { backupPostgres } from "../services/postgres.backup";
import { uploadToS3 } from "../services/s3.upload";

export const startBackupCron = () => {
  cron.schedule("0 */6 * * *", async () => {
    console.log("⏰ Running scheduled backup...");

    try {
      const filePath = await backupPostgres();
      await uploadToS3(filePath);
      console.log("✅ Backup completed");
    } catch (error) {
      console.error("❌ Backup failed", error);
    }
  });
};
