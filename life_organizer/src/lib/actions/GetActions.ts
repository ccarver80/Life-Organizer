'use server'
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient()

export async function getRecipes(){
    const session = await auth()
    const recipes = await prisma.recipe.findMany({
        where: {
            User:{
                rec_id: session?.rec_id
            }
        }
    })

    return recipes
}


export async function getIngredients(recipeId:number) {
    const ingredients = await prisma.ingredient.findMany({
        where:{
            Recipe:{
                rec_id: recipeId
            
            },
        },
        
    })

    
    return ingredients
}


export async function getSteps(recipeId:number) {
    const ingredients = await prisma.recipeStep.findMany({
        where:{
            Recipe:{
                rec_id: recipeId
            }
        },
        orderBy:{
            step_number: 'asc'
        }
    })

    
    return ingredients
}
