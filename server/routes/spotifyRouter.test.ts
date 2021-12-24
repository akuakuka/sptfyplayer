import request from "supertest";
import { app } from "../index";

const baseURL = "/api/spotify"

describe("GET /artists", () => {
    it("fails without access token header", async () => {
        await request(app).get(`${baseURL}/artists`)
            .expect(400)
    })
});


describe("GET /artist/:id", () => {
    it("fails without access token header", async () => {
        await request(app).get(`${baseURL}/artist/${"045891237"}`)
            .expect(400)
    })
});

describe("GET /artist/:id/albums", () => {
    it("fails without access token header", async () => {
        await request(app).get(`${baseURL}/artist/${"045891237"}/albums`)
            .expect(400)
    })
});

describe("GET /album/:id", () => {
    it("fails without access token header", async () => {
        await request(app).get(`${baseURL}/album/${"045891237"}`)
            .expect(400)
    })
});

describe("GET /search/:term", () => {
    it("fails without access token header", async () => {
        await request(app).get(`${baseURL}/search/${"metallica"}`)
            .expect(400)
    })
});

describe("GET /me/", () => {
    it("fails without access token header", async () => {
        await request(app).get(`${baseURL}/me`)
            .expect(400)
    })
});


