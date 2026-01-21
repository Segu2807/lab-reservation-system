import fs from "fs";
import path from "path";
import { s3 } from "../s3";

export const uploadToS3 = async (filePath: string) => {
  const stream = fs.createReadStream(filePath);

  await s3
    .upload({
      Bucket: process.env.S3_BUCKET!,
      Key: path.basename(filePath),
      Body: stream,
    })
    .promise();
};
