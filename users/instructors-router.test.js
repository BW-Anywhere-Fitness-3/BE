const request = require("supertest");

const server = require("../api/server.js");

describe("instructors router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /api/instructors", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/api/instructors")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return instructors as the router value", function() {
      return request(server)
        .get("/api/instructors")
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it("should return JSON formatted body", function() {
      return request(server)
        .get("/api/instructors")
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });

    it("should return an array of instructors (async version)", async function() {
      const res = await request(server).get("/api/instructors");

      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});