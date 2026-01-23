import { exec } from "child_process";
import path from "path";
import fs from "fs";

export const backupPostgres = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const backupDir = "/data/backups";

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const filePath = path.join(
      backupDir,
      `backup-${Date.now()}.sql`
    );

    const command = `pg_dump ${process.env.DB_URL} > ${filePath}`;

    exec(command, (error) => {
      if (error) return reject(error);
      resolve(filePath);
    });
  });
};
