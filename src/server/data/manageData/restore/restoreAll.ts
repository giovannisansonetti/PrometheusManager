"use server"
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export default async function restoreAll(){
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log("Session not found")
        return
    }
    if(data.user){
        await db.note.updateMany({
            where:{
                isDeleted: true
            },
            data:{
                isDeleted: false
            }
        })

        await db.data.updateMany({
            where:{
                isDeleted: true
            },
            data:{
                isDeleted: false
            }
        })
        return JSON.stringify({ message: "All Items successfully restored" })
    }
    return JSON.stringify({ error: "User not found" })
}