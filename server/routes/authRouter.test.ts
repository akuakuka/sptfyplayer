import supertest from "supertest";
import { app } from "../index";

const baseURL = "/api/auth";

describe("Testing authRouter", () => {
  // TCPWRAP OPEN HANDLES FIX
  let server;
  let request;

  beforeAll((done) => {
    server = app.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("GET /login ", () => {
    it("Gets login url", async () => {
      const response = await request.get(`${baseURL}/login`);
      expect(response.status).toBe(200);
      // .expect(302)
    });
  });

  describe("POST /refresh/:refreshtoken ", () => {
    it("fails with wrong token", async () => {
      const response = await request.post(`${baseURL}/refresh/${"token"}`);
      expect(response.status).toBeGreaterThan(400);
      //  .expect(400)
    });
  });

  describe("GET /callback ", () => {
    it("Fails without req.query.code", async () => {
      const response = await request.get(`${baseURL}/callback`);
      expect(response.status).toBeGreaterThan(399);
      //     .expect(400)
    });
  });
});
