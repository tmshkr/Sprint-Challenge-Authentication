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

  it("creates a new user in the database", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "carol", password: "hello" });
    const [user] = await db("users").where({ username: "carol" });
    expect(user.username).toBe("carol");
  });
});

describe("POST /api/auth/login", () => {
  it("returns 200", () => {
    return request(server)
      .post("/api/auth/login")
      .send({ username: "alice", password: "hello" })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("returns the token to the client when providing the correct credentials", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "bob", password: "hello" });
    const { token } = res.body;
    expect(token).toBeTruthy();
  });

  it.todo(
    "returns a 401 error to the client when providing incorrect credentials"
  );
});
