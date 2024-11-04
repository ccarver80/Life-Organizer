'use server'
import { PrismaClient, Prisma } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient()



export async function removeIngredient(rec_id:number) {
    try {
        const remove = await prisma.ingredient.delete({
            where:{
                rec_id: rec_id
            }
        })

        return remove
    } catch (error) {
        console.log(error)
    }
}

export async function removeStep(rec_id:number) {
    try {
        const remove = await prisma.recipeStep.delete({
            where:{
                rec_id: rec_id
            }
        })

        return remove
    } catch (error) {
        console.log(error)
    }
}


export async function removeRecipe(rec_id:number) {
    try {

        const removeIngredients = await prisma.ingredient.deleteMany({
            where:{
                recipeRec_id: rec_id
            }
        })
        const remove = await prisma.recipe.delete({
            where:{
                rec_id: rec_id
            }
        })

        return remove
    } catch (error) {
        console.log(error)
    }
}


export async function deleteBudget() {
    try {
        const session = await auth()
        // Get user id from session
        const user_id = session?.rec_id

        const deleteMany = await prisma.payDate.deleteMany({
            where: {
                userRec_id: user_id
            }
        })

        const deleteBudget = await prisma.budget.delete({
            where:{
                userRec_id: user_id
            }
        })

        return {message:"success"}
    } catch (error) {
        console.log(error)
    }
}