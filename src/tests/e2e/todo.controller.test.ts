import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";

import app from "../../app";
// import { db } from "../../database/connect";
import { env } from "../../env";

describe("Todo Testes", () => {
    beforeAll(() => {
        app.listen(env.PORT, () => console.log("Start testes Todo"))
    })
    
    beforeEach(() => {
        execSync('npm run knex -- migrate:rollback --all') 
        execSync('npm run knex -- migrate:latest')
    })

    it("should be possible create a todo", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        const { body } = await request(app).post("/api/login/").send({
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(200)

        const token = body.token
        const user_id = body.user.id

        await request(app).post("/api/todos/create/").send({ 
            task_title: "complete project", 
            task_description: "finish udemy course project",
            complete: false,
            user_id
        }).set("authorization", token).expect(201)
    })

    it("should be not possible create a todo without token", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        const { body } = await request(app).post("/api/login/").send({
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(200)

        const user_id = body.user.id

        await request(app).post("/api/todos/create/").send({ 
            task_title: "complete project", 
            task_description: "finish udemy course project",
            complete: false,
            user_id
        }).expect(400)
    })

    it("should be possible get all todos", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        const { body } = await request(app).post("/api/login/").send({
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(200)

        const token = body.token
        const user_id = body.user.id

        await request(app).post("/api/todos/create/").send({
            task_title: "complete project", 
            task_description: "finish udemy course project",
            complete: false,
            user_id
        }).set("authorization", token).expect(201)

        await request(app).post("/api/todos/create/").send({
            task_title: "complete project 2", 
            task_description: "finish udemy course project",
            complete: false,
            user_id
        }).set("authorization", token).expect(201)

        await request(app).post("/api/todos/create/").send({
            task_title: "complete project 3", 
            task_description: "finish udemy course project",
            complete: false,
            user_id
        }).set("authorization", token).expect(201)

        const posts = await request(app).get(`/api/todos/${user_id}`).set("authorization", token).expect(200)
        
        expect(posts.body.length).toBe(3)
    })

    it("should be possible get one specific todo", async () => {
        await request(app).post("/api/user/create/").send({
            name: "filipe", 
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(201)

        const { body } = await request(app).post("/api/login/").send({
            email: "filipemas@gmail.com", 
            password: "Test123@"
        }).expect(200)

        const token = body.token
        const user_id = body.user.id

        await request(app).post("/api/todos/create/").send({
            task_title: "complete project", 
            task_description: "finish udemy course project",
            complete: false,
            user_id
        }).set("authorization", token).expect(201)

        await request(app).post("/api/todos/create/").send({
            task_title: "complete project 2", 
            task_description: "finish udemy course project",
            complete: false,
            user_id
        }).set("authorization", token).expect(201)

        await request(app).post("/api/todos/create/").send({
            task_title: "complete project 3", 
            task_description: "finish udemy course project",
            complete: false,
            user_id
        }).set("authorization", token).expect(201)

        const posts = await request(app).get(`/api/todos/${user_id}`).set("authorization", token).expect(200)
        
        expect(posts.body.length).toBe(3)
    })
})