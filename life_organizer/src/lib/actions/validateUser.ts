import { createUser } from "./createUser";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";


function hasWhiteSpace(username:string){
    return (/\s/).test(username)
}

interface User{
    username:string,
    password:string,
    email:string,
    rec_id:number,
    code:string,
    target:string,
    message:string
}

interface Error{
   
}

export async function validateForm(formData:FormData){
    // Check Passwords Match
    if (formData.get("password") === formData.get("password2")) {
        // Check Username Dosn't Contain Spaces
        const username = formData.get('username') as string
        if(hasWhiteSpace(username)){
            return "username error"
        }else{
            // Passes create user and log in 
           const user = await createUser(formData);
            if ('username' in user) {
                const login = {
                    username: user.username,
                    password: formData.get("password"),
                };
                signIn("credentials", login);
                toast.success("User Successfully Created! Welcome " + login.username)
                redirect('/')   
            }else {
                if('code' in user){
                    // P2002 is a Unique constraint on Prisma DB
                    if(user.code === 'P2002'){
                      toast.error(`An Account with ${user.target}: ${formData.get(user.target)} Already Exists`)
                      
                    }else{
                        toast.error("Something Went Wrong Creating The User")  
                    }
                }else{
                   toast.error("Something Went Wrong Creating The User"); 
                }
            } 
        }
    }else {
        toast.error("Sorry Passwords Don't Match");
        return "password error"
      }
}