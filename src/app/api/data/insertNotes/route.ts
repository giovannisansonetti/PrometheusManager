import { NextRequest, NextResponse } from "next/server"
import checkSecurityPass from "utils/pswsecuritychecker"
import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"

export async function POST(req: NextRequest) {
    const supabase = createClient()
    const body = await req.json()

    const { title, description } = body
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized user",
            error: true,
        })
    }

    if (!title || !description) {
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

    const insertNote = {
        title,
        description,
    }

    await db.note.create({
        data: {
            userId: user.id,
            noteTitle: insertNote.title,
            noteDescription: insertNote.description,
            isDeleted: false
        }
    })

    return NextResponse.json({
        success: true,
        status: 200,
        message: "Item created successfully",
    })
}
