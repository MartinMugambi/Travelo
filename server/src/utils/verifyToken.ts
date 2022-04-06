import JWT from "jsonwebtoken"
import { JWT_KEY } from "../keys"

export const verifyToken =  async (token: string) =>{
    try {
     
    return JWT.verify(token, JWT_KEY) as unknown as {
        user_id: number
    }
     
    } catch  {
        return null;
    }
}