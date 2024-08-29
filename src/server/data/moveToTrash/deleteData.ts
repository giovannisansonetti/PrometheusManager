"use server"
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export default async function deleteData(dataId: string){
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
        await db.data.update({
            where:{
                userId: supabaseUserId,
                id: dataId
            },
            data:{
                isDeleted: true
            }
        })
    }
}