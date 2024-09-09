import { NextRequest, NextResponse} from "next/server"
import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"

export async function GET(req: NextRequest){
    const response = await fetchHealthCheck()
    if (response.error) {
        return NextResponse.json({ status: 404, message: response.message, error: true})
    }
    if(response.status === 200){
      return NextResponse.json({data: response.data, status: response.status })
    }
}


const fetchHealthCheck = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        return { error: true, message: "User authentication failed" }
    }

    const user = await db.user.findUnique({
        where: { id: data.user.id },
    })
    
    if (!user) {
        return { error: true, message: "User not found" }
    }

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
                    gte: sixtyDaysAgo 
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

        const healthcheck = {
            weakPasswords: weakPasswords, 
            oldPasswords: oldPasswords, 
            reusedPasswords: reusedPasswords
        }
        
        return{
            status: 200,
            message: "OK",
            data: healthcheck
        }
    }

    return { status: 404, message: "", error: true} 
}