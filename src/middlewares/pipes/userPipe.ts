import {z} from "zod"
import { Request, Response, NextFunction } from "express"
import regexPassword from "../../utils/regexPassword"

const userDataSchema = z.object({
    name: z.string(), 
    email: z.string().email(), 
    password: z.string().regex(regexPassword),
    two_factory: z.boolean().default(false)
})

const userIdSchema = z.object({
    id: z.string().uuid()
})

export type userType = z.infer<typeof userDataSchema>

export function validUserData(req: Request, res: Response, next: NextFunction){
    const userData = userDataSchema.safeParse(req.body)

    if(!userData.success){
        return res.status(400).json({ msg: "The following fields must be filled in: name, email, password" })
    }

    req.body.two_factory = Boolean(userData.data.two_factory)

    next()
}

export function validUserId(req: Request, res: Response, next: NextFunction ){
    const userId = userIdSchema.safeParse(req.params)

    if(!userId.success){
        return res.status(400).json({ msg: "The id is not a UUID" })
    }

    next()
}