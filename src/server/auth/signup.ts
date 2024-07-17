"use server"

import { createClient } from "utils/supabase/server"
import { type FormProps } from "~/components/auth/SignUp/Form.models"
import { db } from "../db"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function signup(formprops: FormProps) {
    "use server"
    const supabase = createClient()

    const data = {
        email: formprops.email as string,
        password: formprops.masterPass as string,
    }

    const signupData = {
        email: formprops.email as string,
        masterPass: formprops.masterPass as string,
        phoneNumber: formprops.phoneNumber as string
    }

    const { error } = await supabase.auth.signUp(data)

    if (!error) {
        await db.user.create({
            data:{
                email: signupData.email,
                masterPass: signupData.masterPass,
                phoneNumber: signupData.phoneNumber
            }
        })  
        revalidatePath('/', 'layout')
        redirect('/')
    }

    console.log(error)
    redirect('/error')

}