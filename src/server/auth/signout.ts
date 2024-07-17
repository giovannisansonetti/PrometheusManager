"use server"

import { createClient } from "utils/supabase/server"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signout() {

    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if(!error){
        revalidatePath('/', 'layout')
        redirect('/')
    }

    console.log("user session doesn't exist")
}