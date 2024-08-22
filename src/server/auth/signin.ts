"use server"

import { createClient } from "utils/supabase/server"
import { type FormProps } from "~/components/auth/SignIn/Form.models"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from "../db"
import getIp from "utils/retrieveInfo/info"


export async function signIn(formprops: FormProps) {    
    const supabase = createClient()

    const singIndata = {
        email: formprops.email as string,
        password: formprops.masterPass as string,
    }

    const { data, error } = await supabase.auth.signInWithPassword(singIndata)

    const ip = await getIp()

    if (!error) {
        if(data.user){
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

    return JSON.stringify({ error: "User not found" })

}