"use server"

import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"

export default async function fetchHealthCheck(){
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 90)

    if(error){
        console.log(error)
    }

    if(data.user){
        const weakPasswords = await db.data.groupBy({
            by: ['password'],
            _count: {
                password: true
            },
            where: {
                userId: data.user.id,
                OR: [
                    { passwordSecurity: "Very Weak" },
                    { passwordSecurity: "Weak" },
                    { passwordSecurity: "Very Weak - Common Password" }
                ],
                isDeleted: false
            }
        })

        const oldPasswords = await db.data.groupBy({
            by: ['password'],
            _count: {
                password: true
            },
            where: {
                userId: data.user.id,
                createdAt: {
                    gte: sixtyDaysAgo // 90 days old passwords
                },
                isDeleted: false
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
            },
        })

        return JSON.stringify({ 
            weakPassword: weakPasswords, 
            oldPassword: oldPasswords, 
            reusedPasswords: reusedPasswords
        })
        
    }
}