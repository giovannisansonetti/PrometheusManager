"use server"

import { Data, Note } from "@prisma/client"
import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"

export async function fetchAllitems() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        console.error("Failed to get user:", error)
        return JSON.stringify({ error: "Failed to authenticate user" })
    }

    const user = await db.user.findUnique({
        where: { id: data.user.id },
    })

    if (user) {
        try {
            const dataItems: Data[] = await db.data.findMany({
                where: { userId: user.id }
            })

            const notes: Note[] = await db.note.findMany({
                where: { userId: user.id }
            })

            const allItems = {
                dataItems,
                notes
            }

            if (dataItems.length !== 0 || notes.length !== 0) {
                return JSON.stringify(allItems)
            }

            return JSON.stringify({ message: "No data saved" })

        } catch (error) {
            console.error("Error fetching items:", error)
        }
    }
}
