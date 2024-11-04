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
            },
            include: {
                pay_dates: true
            }  
        })

        if(formData.get("pay_period_type") != "bi-monthly"){
            const paydate = await prisma.payDate.create({
            data:{
                pay_date: new Date(new Date((formData.get("pay_date") as string)).toLocaleDateString('en-us', {timeZone: "UTC"})),
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
                    pay_date: new Date(new Date((formData.get("pay_date_one") as string)).toLocaleDateString('en-us', {timeZone: "UTC"})),
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
                    pay_date: new Date(new Date((formData.get("pay_date_two") as string)).toLocaleDateString('en-us', {timeZone: "UTC"})),
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


        return budget
        
    } catch (error) {
        console.log(error)
    }
    
}


export async function calculateNextPaydDays(days: number) {
    try {
        const session = await auth()
        // Get user id from session
        const user_id = session?.rec_id
        const lastPayDate = await prisma.payDate.findMany({
            where: {
                userRec_id: user_id
            },
            orderBy:{
                rec_id: 'desc'
            },
            take: 1
        })


        const newDate = new Date(new Date(lastPayDate[0].pay_date).setDate(lastPayDate[0].pay_date.getDate() + days))

            const newPayDate = await prisma.payDate.create({
                data:{
                    pay_date: newDate,
                    Budget: {
                        connect: {
                            rec_id: lastPayDate[0].budgetRec_id
                        }
                    },
                    User: {
                        connect: {
                            rec_id: user_id
                        }
                    }
                }
            })

    } catch (error) {
        console.log(error)
    }
}


export async function calculateNextPayMonths(months: number) {
    try {
        const session = await auth()
        // Get user id from session
        const user_id = session?.rec_id
        const lastPayDate = await prisma.payDate.findMany({
            where: {
                userRec_id: user_id
            },
            orderBy:{
                rec_id: 'desc'
            },
            take: 1
        })


        const newDate = new Date(new Date(lastPayDate[0].pay_date).setMonth(lastPayDate[0].pay_date.getMonth() + months))

            const newPayDate = await prisma.payDate.create({
                data:{
                    pay_date: newDate,
                    Budget: {
                        connect: {
                            rec_id: lastPayDate[0].budgetRec_id
                        }
                    },
                    User: {
                        connect: {
                            rec_id: user_id
                        }
                    }
                }
            })

    } catch (error) {
        console.log(error)
    }
}




export async function calculateNextPayBiMonthly(months: number) {
    try {
        const session = await auth()
        // Get user id from session
        const user_id = session?.rec_id


        const lastPayDate = await prisma.payDate.findMany({
            where: {
                userRec_id: user_id
            },
            orderBy:{
                rec_id: 'desc'
            },
            take: 2
        })

        


        const newDate = new Date(new Date(lastPayDate[1].pay_date).setMonth(lastPayDate[1].pay_date.getMonth() + months))
        
            const newPayDate = await prisma.payDate.create({
                data:{
                    pay_date: newDate,
                    Budget: {
                        connect: {
                            rec_id: lastPayDate[1].budgetRec_id
                        }
                    },
                    User: {
                        connect: {
                            rec_id: user_id
                        }
                    }
                }
            })


            const newDateTwo = new Date(new Date(lastPayDate[0].pay_date).setMonth(lastPayDate[0].pay_date.getMonth() + months))
            
            const newPayDateTwo = await prisma.payDate.create({
                data:{
                    pay_date: newDateTwo,
                    Budget: {
                        connect: {
                            rec_id: lastPayDate[0].budgetRec_id
                        }
                    },
                    User: {
                        connect: {
                            rec_id: user_id
                        }
                    }
                }
            })

    } catch (error) {
        console.log(error)
    }
}