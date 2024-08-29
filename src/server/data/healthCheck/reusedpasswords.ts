"use server"

import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"

export default async function fetchReusedPassword(){
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log(error)
    }

    if (data.user) {
        const reusedPasswords = await db.data.groupBy({
            by: ['password'],
            _count: {
                password: true, 
            },
            having: {
                password: {
                    _count: {
                        gt: 1 
                    }
                }
            },
            where: {
                userId: data.user.id, 
                isDeleted: false 
            }
        })

        const reusedPasswordCount = reusedPasswords.length
        return reusedPasswordCount
    }

    return 0
}