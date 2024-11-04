'use server'

import { PrismaClient, Prisma } from "@prisma/client";
import {signIn} from "next-auth/react"
import toast from "react-hot-toast";

const prisma = new PrismaClient()

const bcrypt = require('bcrypt')

export async function createUser(formData: FormData){
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(formData.get('password'), salt);
        const hashPassword = hash;
        const user = await prisma.user.create({
                data: {
                    username:formData.get("username") as string,
                    password: hashPassword as string,
                    email: formData.get('email') as string,
                }
            })
        
        return user
        
    }catch(err){
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            const error = {code: err.code, target:err.meta?.target as string}
            return error
        }
        const error = {message: "something went wrong"}
        return error
    }
}