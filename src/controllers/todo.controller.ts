import { Request, Response } from "express"
import { randomUUID } from "node:crypto";

import { db } from "../database/connect";
import { todoParam, todoType } from "../middlewares/pipes/todoPipe";

export default {
    async getAllTodos(req: Request, res: Response) {
        const { userId: user_id } = req.params as todoParam

        try{
            const todos = await db('todos').select("id","complete","task_description","task_title").where({
                user_id
            })
            
            return res.json(todos).status(200)
        } catch(error){
            console.log(error)
            return res.status(500).json({ msg: 'Server error' })
        }
    },

    async getOneTodo(req: Request, res: Response) {
        const { id, userId: user_id } = req.params as todoParam

        try{
            const oneTodo = await db('todos').select("id","complete","task_description", "task_title").where({
                id, user_id
            }).first()
            
            if(!oneTodo){
                return res.status(404).json({ msg: "Not Found!" })
            }
            
            return res.json(oneTodo).status(200)
        } catch(error){
            console.log(error)
            return res.status(500).json({ msg: 'Server error' })
        }
    },

    async createTodo(req: Request, res: Response) {
        const { task_title, task_description, complete, user_id } = req.body as todoType
        
        try {
            await db("todos").insert({
                id: randomUUID(),
                task_title, 
                task_description,
                complete,
                user_id,
            })

            return res.status(201).json({ msg: 'Todo registered successfully' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: 'Server error' })
        }
    },

    async modifyTodo(req: Request, res: Response) { 
        const { task_title, task_description, complete, user_id } = req.body as todoType
        const { id } = req.params as todoParam
        
        try {
            await db("todos").where({ id, user_id }).update({
                task_title, 
                task_description,
                complete,
            })

            return res.status(200).json({ msg: 'Todo modified successfully' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: 'Server error' })
        }
    },

    async deleteTodo(req: Request, res: Response) { 
        const { id, userId: user_id } = req.params as todoParam

        try{
            const searchTodo = await db('todos').where({ id, user_id }).first()
            
            if(!searchTodo){
                return res.status(404).json({ msg: 'Error on delete'})
            }

            await db('todos').where({ id, user_id }).first().delete()

            return res.status(200).json({ msg: 'Deleted successfully' })
        }catch(error){
            console.log(error)
            res.status(500).json({ msg: `Erro on server`})
        }
    },
}