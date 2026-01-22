import cron from "node-cron";
import { exec } from "child_process";

export function startBackupCron() {
  cron.schedule("0 2 * * *", () => {
    console.log("⏰ Ejecutando backup programado...");

    exec("sh scripts/backup.sh", (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Error backup:", error.message);
        return;
      }
      if (stderr) {
        console.error("⚠️ STDERR:", stderr);
      }
      console.log("✅ Backup OK:", stdout);
    });
  });
}
