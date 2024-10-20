'use server'
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient()

interface Ingredient {
    number?: number,
    ingredient_name: string;
    ingredient_amount: string;
    recipeRec_id: number
  }
  


export async function submitIngredients(ingredients:Ingredient[], recipeId:number){
    try {

        // removes the number key used to map in previous component for removal on list
        ingredients.map((ingredient) => {
            delete ingredient.number
        })

        const create = await prisma.ingredient.createMany({
            data: ingredients,
            
        })

        return(create)
    } catch (error) {
        console.log(error)
    }
}