"use server"

import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"

export default async function fetchOldPassword(){
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log(error)
    }

    if(data.user){
        const oldPassword = await db.data.aggregate({
            _count: {
                _all: true 
            },
            where:{
                userId: data.user.id,
                OR: [
                    { passwordSecurity: "Very Weak" },
                    { passwordSecurity: "Weak" },
                    { passwordSecurity: "Very Weak - Common Password"}
                ]
            }
        })
    }
}