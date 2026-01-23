import { Router } from "express";
import { backupPostgres } from "../services/postgres.backup";
import { s3 } from "../s3";
import fs from "fs";
import path from "path";
import AWS from "aws-sdk";

const router = Router();

router.post("/run", async (_, res) => {
  const pgFile = await backupPostgres();
  const stream = fs.createReadStream(pgFile);

  const upload: AWS.S3.ManagedUpload = s3.upload({
    Bucket: "backups",
    Key: path.basename(pgFile),
    Body: stream,
  });

  await upload.promise();

  res.json({
    message: "Backup completed successfully",
  });
});

export default router;


