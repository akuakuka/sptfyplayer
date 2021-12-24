import request from "supertest";
import { app } from "../index";

const baseURL = "/api/auth"

describe("GET /login ", () => {

    it("Redirects to spotify login page", async () => {
        await request(app).get(`${baseURL}/login`)
            .expect(302)
    })
});

describe("POST /refresh/:refreshtoken ", () => {
    it("fails with wrong token", async () => {
        await request(app).post(`${baseURL}/refresh/${"token"}`)
            .expect(400)
    })
});

describe("GET /callback ", () => {
    it("Fails without req.query.code", async () => {
        await request(app).get(`${baseURL}/callback`)
            .expect(400)
    })
});





