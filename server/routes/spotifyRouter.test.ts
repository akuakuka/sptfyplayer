import supertest from "supertest";
import { app } from "../index";
import { getTokenForTesting } from "../services/spotifyService";

const baseURL = "/api/spotify";
const stam1naBand = "41nB823nb3wxEI25UeGHqG";
const paranoidAlbum = "132qAo1cDiEJdA3fv4xyNK";
const elokuutioAlbum = "15vBirjFQhM2xAn1MIGwgw";

let access_token = "";
beforeAll(async () => {
  const response = await getTokenForTesting();
  access_token = `Bearer ${response.access_token}`;
});

describe("Testing spotifyRouter", () => {
  // TCPWRAP OPEN HANDLES FIX
  let server;
  let request;
  let access_token = "";

  beforeAll(async () => {
    const response = await getTokenForTesting();
    access_token = `Bearer ${response.access_token}`;
  });

  beforeAll((done) => {
    server = app.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("GET /artists", () => {
    it("fails without access token header", async () => {
      const response = await request.get(`${baseURL}/artists`);
      expect(response.status).toBe(400);
    });
  });

  describe("GET /artist/:id", () => {
    it("fails without access token header", async () => {
      const response = await request.get(`${baseURL}/artist/${"045891237"}`);
      expect(response.status).toBe(400);
    });
    it("gets stam1na", async () => {
      const response = await request
        .get(`${baseURL}/artist/${stam1naBand}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("Authorization", access_token);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(stam1naBand);

      //
    });
  });

  describe("GET /artist/:id/albums", () => {
    it("fails without access token header", async () => {
      const response = await request.get(
        `${baseURL}/artist/${"045891237"}/albums`
      );
      expect(response.status).toBe(400);
    });

    it("gets artists albums", async () => {
      const response = await request
        .get(`${baseURL}/artist/${stam1naBand}/albums`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("Authorization", access_token);
      expect(response.status).toBe(200);
      //TODO: id changed?
      /*       expect(
        response.body.filter((s) => s.name === "Elokuutio").map((a) => a.id)[0]
      ).toContain(elokuutioAlbum); */
    });
  });

  describe("GET /album/:id", () => {
    it("fails without access token header", async () => {
      const response = await request.get(`${baseURL}/album/${"045891237"}`);
      expect(response.status).toBe(400);
    });
  });

  describe("GET /search/:term", () => {
    it("fails without access token header", async () => {
      const response = await request.get(`${baseURL}/search/${"metallica"}`);
      expect(response.status).toBe(400);
    });
  });

  describe("GET /me/", () => {
    it("fails without access token header", async () => {
      const response = await request.get(`${baseURL}/me`);
      expect(response.status).toBe(400);
    });
  });
});
