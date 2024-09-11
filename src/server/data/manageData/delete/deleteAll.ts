"use server"
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export default async function deleteAll(){
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log("Session not found")
        return
    }
    if(data.user){
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

        return JSON.stringify({ 
            status: 200,
            success: true,
            message: "All items successfully deleted"
        })
    }
    return JSON.stringify({ error: "User not found" })
}