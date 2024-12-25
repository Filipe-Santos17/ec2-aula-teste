import { z } from "zod"
import { Request, Response, NextFunction } from "express"

const todoDataSchema = z.object({
    task_title: z.string().min(3),
    task_description: z.string().min(3),
    complete: z.boolean().default(false),
    user_id: z.string().uuid(),
})

const todoAndUserIdParamsSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
})

export type todoType = z.infer<typeof todoDataSchema>
export type todoParam = z.infer<typeof todoAndUserIdParamsSchema>

export function validTodoData(req: Request, res: Response, next: NextFunction){
    const todoData = todoDataSchema.safeParse(req.body)

    if(!todoData.success){
        return res.status(400).json({ msg: "The following fields must be filled in: task_title, task_description, complete, user_id" })
    }

    next()
}

export function validIdUserParam(req: Request, res: Response, next: NextFunction){
    const todoParam = todoAndUserIdParamsSchema.omit({ id: true }).safeParse(req.params)

    if(!todoParam.success){
        return res.status(400).json({ msg: "Need user_id be a UUID" })
    }

    next()
}

export function validTodoIdAndUserParams(req: Request, res: Response, next: NextFunction){
    const todoAndUserParams = todoAndUserIdParamsSchema.safeParse(req.params)

    if(!todoAndUserParams.success){
        return res.status(400).json({ msg: "Need id and user_id be a UUID" })
    }

    next()
}