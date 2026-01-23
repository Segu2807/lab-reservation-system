import { CronJob } from "cron";
import axios from "axios";

export const startCron = () => {
  new CronJob("0 2 * * *", async () => {
    console.log("⏰ Ejecutando backup automático");
    await axios.post("http://localhost:3009/backup/run");
  }).start();
};
