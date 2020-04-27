const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

let token;
beforeAll(async () => {
  await db("users").truncate();
  const res = await request(server)
    .post("/api/auth/register")
    .send({ username: "alice", password: "hello" });
  token = res.body.token;
});

describe("GET /api/jokes", () => {
  it("returns status 200 when providing a valid token", () => {
    return request(server)
      .get("/api/jokes")
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("returns the jokes when providing a valid token", () => {
    return request(server)
      .get("/api/jokes")
      .set("Authorization", token)
      .then((res) => {
        expect(res.body[0].joke).toBeTruthy();
      });
  });

  it("returns 401 when providing an invalid token", () => {
    return request(server)
      .get("/api/jokes")
      .set("Authorization", "!" + token)
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });
});
