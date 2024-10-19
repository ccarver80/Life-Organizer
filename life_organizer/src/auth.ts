
import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

const bcrypt = require('bcrypt')

const prisma = new PrismaClient()


async function getUser(username:string){
    try{ 
        let user = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
        return user
    }catch(err){
        return null
    }
}

export const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                
                const user = await getUser(credentials.username as string)

                if(user){
                    const correctPassword = await bcrypt.compare(credentials.password, user.password)
                    if(correctPassword){
                        return user
                    }
                    return null
                }
                return null
               
                
            }
        })
    ],
    
    callbacks:{
        async jwt({token, account}){
            return token
        },
        async session({session, token, user}){
            return session
        },
        
    }
}) 