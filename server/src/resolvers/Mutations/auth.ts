import {Prisma, User } from ".prisma/client";
import { Context } from "../..";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import "dotenv/config"
import { JWT_KEY } from "../../keys";



interface AuthArgs{
    input: {
     username?: string
     email: string
     password: string
    }
}

interface PayLoadType{
    userErrors: {
        message: string
    }
    user: User | null | Prisma.Prisma__UserClient<User | null>
    token: string | null
}


interface OrderArgs{
    title: string,
    price: string
}
export const authResolver = {

    signUp: async (parent:any, {input}:AuthArgs, {prisma, userInfo}:Context) : Promise<PayLoadType> =>{

        const {username, email, password} = input;

        
        if(!username || !email || !password){

            return {
                userErrors: 
                    {
                        message: "invalid credentials"
                    },
                user: null,
                token: null
            }
        }

        const isEmail = validator.isEmail(email);

        if(!isEmail){
            return {
                userErrors: 
                    {
                        message: "enter correct email address"
                    },
                user: null,
                token: null
            }
        }
        
        const isPassword = validator.isLength(password, {
            min: 5
        });

        if(!isPassword){
            return {
                userErrors: 
                    {
                        message: "password must be more than five characters"
                    },
                user: null,
                token: null,
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        });

        const token = await JWT.sign({
            user_id: user.id
        }, JWT_KEY, {
            expiresIn: 360000
        });

     

        return {
            userErrors: {
                message: "user created"
            },
            user,
            token: token,
        }
    },

    signIn: async (parent:any, {input}:AuthArgs, {prisma, userInfo}:Context) : Promise<PayLoadType> =>{
     
        const {email, password} = input

        if(!email || !password){
            return {
                userErrors: {
                    message: "enter credentials"
                },
                user: null,
                token: null
            }
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if(!user){
            return {
                userErrors: {
                    message: "user not found"
                },
                user: null,
                token: null
            }
        }

        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return {
                userErrors: {
                    message: "invalid credentials"
                },
                user: null,
                token: null
            }
        }

        const token =  await JWT.sign({
            user_id: user.id
        }, JWT_KEY, {
            expiresIn: 360000
        });
        
        return {
            userErrors: {
                message: "user loggined in"
            },
            user,
            token: token
        }
    },


}