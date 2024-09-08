"use server"
import { createClient } from "utils/supabase/server";
import { AddNoteProps } from "~/components/Dashboard/DisplayNotes/interfaces/AddNote.models";
import { db } from "~/server/db";

export async function insertNote(formProps: AddNoteProps) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if(error || !data.user){
        console.log("session doesn't exist")
        return
    }

    const supabaseUserId = data.user.id;

    const user = await db.user.findUnique({
        where: { id: supabaseUserId },
    })

    if(user){
        const insertNote = {
            title: formProps.title as string,
            description: formProps.description as string,
        }
        try{
            await db.note.create({
                data: {
                    userId: user.id,
                    noteTitle: insertNote.title,
                    noteDescription: insertNote.description,
                    isDeleted: false
                }
            })}
        catch(dbError){
            return JSON.stringify({error: "Internal Server Error"})
        }
    }
    else{
        return
    }
}