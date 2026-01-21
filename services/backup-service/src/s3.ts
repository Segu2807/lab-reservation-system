import AWS from "aws-sdk";

export const s3 = new AWS.S3({
  endpoint: "http://minio:9000",
  accessKeyId: "minioadmin",
  secretAccessKey: "minioadmin",
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

