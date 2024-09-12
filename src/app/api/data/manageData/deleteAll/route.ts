import { NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export async function POST(req: NextRequest){
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        console.error("Failed to get user:", error);
        return
    }

    const supabaseUserId = data.user.id

    const user = await db.user.findUnique({
        where: { id: supabaseUserId },
    })

    if(user){
        try{
            await db.data.deleteMany({
                where:{
                    userId: data.user.id,
                    isDeleted: true
                }
            })
            await db.note.deleteMany({
                where:{
                    userId: data.user.id,
                    isDeleted: true
                }
            })
            return NextResponse.json({
                status: 200,
                success: true,
                message: "Items deleted"
            })

        }catch(error){
            return NextResponse.json({
                status: 500, 
                message: "Internal Server Error",
                error: true
            })
        }
    }
    
    return NextResponse.json({
        status: 404,
        message: "User not found",
        error: true 
    })
}