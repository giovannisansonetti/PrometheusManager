"use server"
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export default async function restoreItem(itemId: string){
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log("Session not found")
        return
    }
    
    if(data.user){
        await db.data.update({
            where:{
                id: itemId
            },
            data:{
                isDeleted: false
            }
        })
        return JSON.stringify({ message: "Item successfully restored"})
    }

    return JSON.stringify({ error: "User not found" })
}