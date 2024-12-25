import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { randomUUID } from "node:crypto";

import { db } from "../database/connect";
import { userType } from "../middlewares/pipes/userPipe";

export default {
    async createUser(req: Request, res: Response){
        const { email, name, password, two_factory } = req.body as userType

        try{
            const userAlreadyExist = await db('users').where({
                email
            }).first()
            
            if(userAlreadyExist){
                return res.status(409).json({ msg: 'Server error when registering user' })
            }

            const encryptedPassword = await bcrypt.hash(password, 10)

            await db('users').insert({
                id: randomUUID(),
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                two_factory,
            })

            return res.status(201).json({ msg: 'User registered successfully' })
        }catch(error){
            console.log(error)
            return res.status(500).json({ msg: 'Server error when registering user' })
        }
    },

    async getUser(req: Request, res: Response){
        const { id } = req.params

        try{
            const user = await db('users').select("email","name","id").where({
                id
            }).first()
            
            if(!user){
                return res.json({ msg: "User Not Found!" }).status(404)
            }
            
            return res.json(user).status(200)
        } catch(error){
            console.log(error)
            return res.status(500).json({ msg: 'Server error' })
        }
    },

    async modifyUser(req: Request, res: Response){ //Incompleto
        const { id } = req.params

        try{
            const user = await db('users').where({
                id
            }).first()
            
            if(!user){
                return res.json({ msg: "User Not Found!" }).status(404)
            }
            
            return res.json(user).status(200)
        } catch(error){
            console.log(error)
            return res.status(500).json({ msg: 'Server error' })
        }
    },

    async deleteUser(req: Request, res: Response){
        const { id } = req.params

        try{
            const searchUser = await db('users').where({ id }).first()
            
            if(!searchUser){
                return res.status(404).json({ msg: 'Não existe usuário com esse ID'})
            }

            await db('users').where({ id }).first().delete()

            return res.status(200).json({ msg: 'User already deletad' })
        }catch(error){
            console.log(error)
            res.status(500).json({ msg: `Erro on server`})
        }
    }
}