const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/db");
jest.mock("axios"); // 👈 mock axios for /allocate route
const axios = require("axios");

let roomId;
let studentId = 1; // use any test ID

beforeAll(async () => {
  await pool.query("DELETE FROM allocations");
  await pool.query("DELETE FROM rooms");
});

afterAll(async () => {
  await pool.end();
});

describe("Room API Integration Tests", () => {
  test("POST /rooms → should create a room", async () => {
    const response = await request(app)
      .post("/rooms")
      .send({ room_number: "B202", capacity: 4 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.room_number).toBe("B202");

    roomId = response.body.id;
  });

  test("POST /rooms/allocate → should allocate student to room", async () => {
    // Mock student-service response
    axios.get.mockResolvedValueOnce({ data: { id: studentId } });

    const response = await request(app)
      .post("/rooms/allocate")
      .send({ student_id: studentId, room_id: roomId });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("student_id", studentId);
    expect(response.body).toHaveProperty("room_id", roomId);
  });

  test("GET /rooms/allocations/:student_id → should return allocations", async () => {
    const response = await request(app).get(`/rooms/allocations/${studentId}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("student_id", studentId);
  });
});
