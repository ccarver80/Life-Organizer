'use server'
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient()
import { auth } from "@/auth";
import { parseDate } from "@internationalized/date"
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


export async function submitStep(formData:FormData, recipeId:number) {
    try {


        const create = await prisma.recipeStep.create({
            data: {
                step_number: Number(formData.get("step_number")),
                step_description: formData.get("step_description") as string,
                Recipe:{
                    connect:{
                        rec_id: recipeId
                    }
                }
            }
        })

        return create



    } catch (error) {
        console.log(error)
    }
    
    
}


export async function createPayDate(formData:FormData, ) {
    try {
        
       const session = await auth()
        // Get user id from session
        const user_id = session?.rec_id
        const budget = await prisma.budget.create({
            data: {
                pay_period_type: formData.get("pay_period_type") as string,
                User: {
                    connect:{
                        rec_id: user_id
                    }
                }
            }  
        })

        if(formData.get("pay_period_type") != "bi-monthly"){
            const paydate = await prisma.payDate.create({
            data:{
                pay_date: new Date(formData.get("pay_date") as string),
                Budget: {
                    connect: {
                        rec_id: budget.rec_id
                    }
                },
                User: {
                    connect: {
                        rec_id: user_id
                    }
                }
            }
        })
        }else{
            const paydate1 = await prisma.payDate.create({
                data:{
                    pay_date: new Date(formData.get("pay_date_one") as string),
                    Budget: {
                        connect: {
                            rec_id: budget.rec_id
                        }
                    },
                    User: {
                        connect: {
                            rec_id: user_id
                        }
                    }
                }
            })
            const paydate2 = await prisma.payDate.create({
                data:{
                    pay_date: new Date(formData.get("pay_date_two") as string),
                    Budget: {
                        connect: {
                            rec_id: budget.rec_id
                        }
                    },
                    User: {
                        connect: {
                            rec_id: user_id
                        }
                    }
                }
            })
        }


        return {message: "Success?"}
        
    } catch (error) {
        console.log(error)
    }
    
}