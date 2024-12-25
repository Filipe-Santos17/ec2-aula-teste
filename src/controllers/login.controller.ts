import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { db } from "../database/connect";
import { validDataLogin } from "../middlewares/pipes/loginPipe";
import { generateToken } from "../utils/generateToken";

export default {
    async loginUser(req: Request, res: Response) {
        const { email, password } = req.body as validDataLogin

        try {
            const getUser = await db('users').where({ email }).first()

            if (!getUser) {
                return res.status(400).json({ msg: "Incorrect email or password" });
            }

            const comparePassword = await bcrypt.compare(password, getUser.password);

            if (!comparePassword) {
                return res.status(400).json({ msg: "Incorrect email or password" })
            }

            const { id, name } = getUser

            const token = generateToken(id)

            const userData = {
                user: {
                    id,
                    name,
                    email,
                },
                token
            }

            return res.json(userData).status(200)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ msg: `Server error` })
        }
    },

    async validUserToken(req: Request, res: Response) {
        const { email } = req.body

        try {
            const isUserValid = await db("users").select("email","id","name").where({ email }).first();

            if (isUserValid) {
                return res.status(200).json({ status: "ok", user: isUserValid });
            }
        } catch (error) {
            res.status(403).json({ status: "error", ErroMsg: "invalid token" });
        }
    }
}