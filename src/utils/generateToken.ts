import jwt from "jsonwebtoken"
import { env } from "../env";

export function generateToken(id: string){    
    const tokenJWT = jwt.sign(
        { id }, //Payload
        env.PRIVATE_SECRET, // chave secreta do JWT
        { expiresIn: '1h' }
    )

    return tokenJWT
}