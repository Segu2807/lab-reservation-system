import { exec } from "child_process";
import { v4 as uuid } from "uuid";

export const backupMongo = (): Promise<string> => {
  const dir = `/tmp/mongo-backup-${uuid()}`;

  return new Promise((resolve, reject) => {
    exec(
      `mongodump --host mongodb-backup --port 27017 --db backup_db --out ${dir}`,
      (err) => {
        if (err) reject(err);
        else resolve(dir);
      }
    );
  });
};
