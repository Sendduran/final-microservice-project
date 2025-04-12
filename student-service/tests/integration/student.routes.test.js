const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/db");

beforeAll(async () => {
  // Optional: clean test table
  await pool.query("DELETE FROM students");
});

afterAll(async () => {
  await pool.end(); // Close DB connection after tests
});

describe("Student API", () => {
  let createdStudentId;

  test("POST /students → should create a student", async () => {
    const response = await request(app)
      .post("/students")
      .send({
        name: "John Doe",
        email: "john@example.com",
        course: "Software Engineering"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John Doe");

    createdStudentId = response.body.id;
  });

  test("GET /students/:id → should return student info", async () => {
    const response = await request(app).get(`/students/${createdStudentId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", createdStudentId);
    expect(response.body).toHaveProperty("email", "john@example.com");
  });
});
