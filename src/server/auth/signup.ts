"use server"

import { createClient } from "utils/supabase/server"
import { type FormProps } from "~/components/auth/SignUp/Form.models"
import { db } from "../db"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function signup(formprops: FormProps) {
    "use server"
    const supabase = createClient()

    const signupData = {
        email: formprops.email as string,
        password: formprops.masterPass as string,
    }

    const userData = {
        email: formprops.email as string,
        masterPass: formprops.masterPass as string,
        phoneNumber: formprops.phoneNumber as string
    }

    const { data, error } = await supabase.auth.signUp(signupData)

    try{
        if (!error || data.user) {
            await db.user.create({
                data:{
                    id: data.user?.id,
                    email: userData.email,
                    masterPass: userData.masterPass,
                    phoneNumber: userData.phoneNumber
                }
            })  
            revalidatePath('/', 'layout')
            redirect('/')
        }
    }catch(dbError){
        return JSON.stringify({error: "Error in the db"})
    }

}