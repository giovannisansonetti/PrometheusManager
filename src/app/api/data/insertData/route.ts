import { NextRequest, NextResponse } from "next/server"
import checkSecurityPass from "utils/pswsecuritychecker"
import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"

export async function POST(req: NextRequest) {
    const supabase = createClient()
    const body = await req.json()

    const { title, webSiteLink, username, password, notes } = body
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized user",
            error: true,
        })
    }

    if (!title || !webSiteLink || !username || !password) {
        return NextResponse.json({
            status: 400,
            message: "Missing required fields",
            error: true,
        })
    }

    const supabaseUserId = data.user.id

    const user = await db.user.findUnique({
        where: { id: supabaseUserId },
    })

    if (!user) {
        return NextResponse.json({
            status: 404,
            message: "User not found",
            error: true,
        })
    }

    const insertData = {
        title,
        webSiteLink,
        username,
        password,
        notes,
    }

    const passwordSecurity = checkSecurityPass(insertData.password)
    try{
        await db.data.create({
            data: {
                userId: user.id,
                title: insertData.title,
                webSiteLink: insertData.webSiteLink,
                username: insertData.username,
                password: insertData.password,
                notes: insertData.notes,
                passwordSecurity: passwordSecurity,
                isDeleted: false,
            },
        })

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Item created successfully",
        })
    }
    catch(error){
        return NextResponse.json({
            status: 500, 
            message: "Internal Server Error",
            error: true
        })
    }
    
}
