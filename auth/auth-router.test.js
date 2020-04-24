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
  it("returns the token to the client", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "bob", password: "hello" });
    const { token } = res.body;
    expect(token).toBeTruthy();
  });

  it.todo("creates a new user in the database");
});
