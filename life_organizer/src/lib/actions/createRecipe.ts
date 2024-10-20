'use server'

import { PrismaClient } from "@prisma/client"
import { auth } from "@/auth"
const prisma = new PrismaClient()




export async function createRecipe(formData:FormData){
    try {
        const session = await auth()
        // Get user id from session
        const user_id = session?.rec_id
        const recipe = await prisma.recipe.create({
            data:{
                recipe_name: formData.get('recipe_name') as string,
                recipe_source:formData.get('recipe_source') as string,
                User:{
                    connect:{
                        rec_id: user_id
                    }
                }
            },
        

        })

        return recipe
    } catch (error) {
        console.log(error)
    }
}