"use server"

import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"

export default async function fetchWeakPasswords(){
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log(error)
    }

    if(data.user){
        const weakPasswordCount = await db.data.aggregate({
            _count: {
                _all: true 
            },
            where:{
                userId: data.user.id,
                OR: [
                    { passwordSecurity: "Very Weak" },
                    { passwordSecurity: "Weak" },
                    { passwordSecurity: "Very Weak - Common Password"}
                ],
                isDeleted: false
            }
        })
        console.log(weakPasswordCount._count._all)
        return weakPasswordCount._count._all
    }
}