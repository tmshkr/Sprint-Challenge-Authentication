const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  it("GET / returns 200", () => {
    return request(server)
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
