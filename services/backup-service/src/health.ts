import { Request, Response } from "express";

export const health = (_: Request, res: Response) => {
  res.json({ status: "UP", service: "backup-service" });
};
