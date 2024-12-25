import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";

import app from "../../app";
import { db } from "../../database/connect";
import { env } from "../../env";

describe("User Testes", () => {
    beforeAll(() => {
        app.listen(env.PORT, () => console.log("Start testes Login"))
    })
    
    beforeEach(() => {
        execSync('npm run knex -- migrate:rollback --all') 
        execSync('npm run knex -- migrate:latest')
    })

    it("should be possible make login", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        const loginData = await request(app).post("/api/login/").send({
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(200)

        expect(loginData.body).to.have.property('user').that.is.a("object")
        expect(loginData.body).to.have.property('token').that.is.a("string")
        expect(loginData.body.user).to.have.property('id').that.is.a("string")
        expect(loginData.body.user).to.have.property('name').that.is.a("string")
        expect(loginData.body.user).to.have.property('email').that.is.a("string")
    })

    it("should not be possible make login with incorret password", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        await request(app).post("/api/login/").send({
            email: "filipemas@gmail.com", 
            password: "Test123@##"
        }).expect(400)
    })

    it("should not be possible make login with miss data", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        await request(app).post("/api/login/").send({
            email: "filipemas@gmail.com", 
        }).expect(403)

        await request(app).post("/api/login/").send({
            password: "Test123@##", 
        }).expect(403)
    })
})
