"use server"
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export default async function deleteItem(itemId: string){
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log("Session not found")
        return
    }
    if(data.user){
        await db.data.delete({
            where:{
                id: itemId
            }
        })
        return JSON.stringify({ message: "Item successfully deleted" })
    }
    return JSON.stringify({ error: "User not found" })
}