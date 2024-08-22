"use server"

import { createClient } from "utils/supabase/server"
import { type FormProps } from "~/components/auth/SignUp/Form.models"
import { db } from "../db"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import getIp from "utils/retrieveInfo/info"


export async function signup(formprops: FormProps) {
    "use server"
    const supabase = createClient()

    const signupData = {
        email: formprops.email as string,
        password: formprops.masterPass as string,
    }

    const userData = {
        email: formprops.email as string,
        phoneNumber: formprops.phoneNumber as string
    }

    const { data, error } = await supabase.auth.signUp(signupData)

    const ip = await getIp()

    if (!error || data.user) {
        await db.user.create({
            data:{
                id: data.user?.id,
                email: userData.email,
                phoneNumber: userData.phoneNumber
            }
        })  
        if(data.user) {
            await db.userLoginHistory.create({
                data:{
                    userId: data.user.id,
                    ipAddress: ip,
                    deviceInfo: "no device" 
                }
            })
        }

        revalidatePath('/', 'layout')
        redirect('/')
    }
    console.log(error)
    
    if(error.code === "weak_password"){
        return JSON.stringify({ error: "Weak password, make it longer" })
    }
    if(error.code === "user_already_exists"){
        return JSON.stringify({ error: "Email already registered" })
    }
    if(error.code === "validation_failed"){
        return JSON.stringify({ error: "Invalid email format" })
    }

    return JSON.stringify({error: error?.message})
}