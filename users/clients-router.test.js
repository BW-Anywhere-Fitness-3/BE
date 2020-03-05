const request = require("supertest");

const server = require("../api/server.js");

describe("clients router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /api/clients", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/api/clients")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return clients as the router value", function() {
      return request(server)
        .get("/api/clients")
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it("should return JSON formatted body", function() {
      return request(server)
        .get("/api/clients")
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });

    it("should return an array of clients (async version)", async function() {
      const res = await request(server).get("/api/clients");

      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});