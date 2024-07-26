"use server"

import { createClient } from "utils/supabase/server"
import { type FormProps } from "~/components/auth/SignIn/Form.models"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signIn(formprops: FormProps) {    
    const supabase = createClient()

    const data = {
        email: formprops.email as string,
        password: formprops.masterPass as string,
    }


    const { error } = await supabase.auth.signInWithPassword(data)

    if (!error) {
        revalidatePath('/', 'layout')
        redirect('/')
    }
    return JSON.stringify({error: "User not found"})



}