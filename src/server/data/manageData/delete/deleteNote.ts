"use server"
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export default async function deleteNote(noteId: string){
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()

    if(error){
        console.log("Session not found")
        return
    }
    if(data.user){
        await db.note.delete({
            where:{
                id: noteId
            }
        })
        return JSON.stringify({ message: "Note successfully deleted" })
    }
    return JSON.stringify({ error: "User not found" })
}