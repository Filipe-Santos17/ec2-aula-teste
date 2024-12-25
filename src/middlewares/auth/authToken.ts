import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"
import { env } from "../../env";

export function validUserJWTToken(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"];

    if (!token) return res.status(400).send({ msg: "Access denied" });

    try {
        jwt.verify(token, env.PRIVATE_SECRET);
        
        next();
    } catch (err) {
        return res.status(400).send({ msg: "Invalid token" });
    }
}