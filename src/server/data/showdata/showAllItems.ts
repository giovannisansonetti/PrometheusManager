"use server" // request function
import { Data } from "@prisma/client";
import { Note } from "@prisma/client";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export async function fetchAllitems(){
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        console.error("Failed to get user:", error);
        return
    }

    const user = await db.user.findUnique({
        where: { id: data.user.id },
    })

    if(user){
        const [dataItems, notesItems] = await Promise.all([
            db.data.findMany({
                where: { userId: user.id },
            }),
            db.note.findMany({
                where: { userId: user.id },
            })
        ])

        const allItems = {data: dataItems, notes: notesItems}

        console.log(JSON.stringify(allItems))
        return allItems
    }
}