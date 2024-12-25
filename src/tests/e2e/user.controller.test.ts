import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";

import app from "../../app";
import { db } from "../../database/connect";
import { env } from "../../env";

describe("User Testes", () => {
    beforeAll(() => {
        app.listen(env.PORT, () => console.log("Start testes Users"))
    })
    
    beforeEach(() => {
        execSync('npm run knex -- migrate:rollback --all') 
        execSync('npm run knex -- migrate:latest')
    })

    it("should be possible create a user", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)
    })

    it("should not be possible create a user without email or password", async () => {
        await request(app).post("/api/user/create").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
        }).expect(400)

        await request(app).post("/api/user/create").send({
            name: "filipe", 
            password: "Test123@"
        }).expect(400)
    })

    it("should not be possible create two users with the same email", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "Filipemas@Gmail.com", 
            password: "Test123@"
        }).expect(409)
    })

    it("should not be possible create a user with a weak password", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemasD@gmail.com", 
            password: "12345678"
        }).expect(400)
    })

    it("should be possible get the user by your id", async () => {
        const user = {
            name: "filipe", 
            email: "filipem@gmail.com",
            password: "Test123@",
        }

        await request(app).post("/api/user/create/").send(user).expect(201)

        const userDB = await db('users').select().where({ email: user.email }).first()

        expect(user.password === userDB!.password).toBe(false) //encrypt password

        const myUser = await request(app).get(`/api/user/${userDB!.id}`).expect(200)

        expect(myUser.body).to.have.property('id').that.is.a("string")
        expect(myUser.body).to.have.property('email').that.is.a("string")
        expect(myUser.body).to.have.property('name').that.is.a("string")
        expect(myUser.body).not.to.have.property('password')
    })

    it("should be possible delete a user", async () => {
        const user = {
            name: "filipe", 
            email: "filipem@gmail.com",
            password: "Test123@",
        }

        await request(app).post("/api/user/create/").send(user).expect(201)

        const userDB = await db('users').select().where({ email: user.email }).first()

        await request(app).delete(`/api/user/delete/${userDB!.id}`).expect(200)
    })
})