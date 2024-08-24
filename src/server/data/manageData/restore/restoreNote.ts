"use server"
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export default async function restoreNote(noteId: string){
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log("Session not found")
        return
    }

    if(data.user){
        await db.note.update({
            where:{
                id: noteId
            },
            data:{
                isDeleted: false
            }
        })
        return JSON.stringify({ message: "Note successfully restored"})
    }
    
    return JSON.stringify({ error: "User not found" })
}