import { z } from "zod"
import { Request, Response, NextFunction } from "express"
import regexPassword from "../../utils/regexPassword"

const validateUserLoginInfo = z.object({
    email: z.string().email(),
    password: z.string().regex(regexPassword),
})

export type validDataLogin = z.infer<typeof validateUserLoginInfo>


export function validUserLogin(req: Request, res: Response, next: NextFunction){
    const userData = validateUserLoginInfo.safeParse(req.body)

    if (!userData.success) {
        return res.status(403).json({ msg: "Incorrect email or password" });
    }   

    const { email } = userData.data

    req.body.email = email.toLowerCase()

    next()
}