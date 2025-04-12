const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/db");

describe("✅ Student API - Smoke Test", () => {
  afterAll(async () => {
    await pool.end();
  });

  test("POST /students → should create a student", async () => {
    const res = await request(app)
      .post("/students")
      .send({
        name: "Test Student",
        email: `test-${Date.now()}@example.com`,
        course: "Testing 101",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test Student");
  });
});
