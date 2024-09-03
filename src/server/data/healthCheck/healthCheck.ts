"use server"

import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"

export default async function fetchHealthCheck(){
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)

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

        const oldPassword = await db.data.aggregate({
            _count: {
                _all: true 
            },
            where:{
                userId: data.user.id,

                createdAt: {
                    gte: sixtyDaysAgo // returns the count of only the passwords that are 60 days old
                }
            }
        })

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

        return JSON.stringify({ 
            weakPassword: weakPasswordCount._count._all, 
            oldPassword: oldPassword._count._all, 
            reusedPasswords: reusedPasswords
        })
    }
}