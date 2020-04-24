const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeAll(() => db("users").truncate());

describe("POST /api/auth/register", () => {
  it("returns 201", () => {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "alice", password: "hello" })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
  it.todo("returns the new user ID to the client");
  it.todo("creates a new user in the database");
});
