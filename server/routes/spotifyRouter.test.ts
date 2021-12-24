import supertest from 'supertest';
import { app } from "../index";

const baseURL = "/api/spotify"

describe("Testing spotifyRouter", () => {

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


    describe("GET /artists", () => {
        it("fails without access token header", async () => {
            const response = await request.get(`${baseURL}/artists`)
            expect(response.status).toBe(400);
        })
    });


    describe("GET /artist/:id", () => {
        it("fails without access token header", async () => {
            const response = await request.get(`${baseURL}/artist/${"045891237"}`)
            expect(response.status).toBe(400);
        })
    });

    describe("GET /artist/:id/albums", () => {
        it("fails without access token header", async () => {
            const response = await request.get(`${baseURL}/artist/${"045891237"}/albums`)


            expect(response.status).toBe(400);
        })
    });

    describe("GET /album/:id", () => {
        it("fails without access token header", async () => {
            const response = await request.get(`${baseURL}/album/${"045891237"}`)
            expect(response.status).toBe(400);
        })
    });

    describe("GET /search/:term", () => {
        it("fails without access token header", async () => {
            const response = await request.get(`${baseURL}/search/${"metallica"}`)
            expect(response.status).toBe(400);
        })
    });

    describe("GET /me/", () => {
        it("fails without access token header", async () => {
            const response = await request.get(`${baseURL}/me`)
            expect(response.status).toBe(400);
        })
    });
});



