import request = require("supertest");
import app from "../../src/app";

describe("Report Service - Health Check", () => {
  it("GET /health should return 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
  });
});
