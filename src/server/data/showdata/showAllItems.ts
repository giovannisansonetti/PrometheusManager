"use server"

import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"
import { AllItems } from "./allitems.models"

export async function fetchAllitems() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        console.error("Failed to get user:", error)
        return JSON.stringify({ error: "Failed to authenticate user" })
    }

    const user = await db.user.findUnique({
        where: { id: data.user.id }
    })

    if (user) {
        try {
            const [dataItems, noteItems] = await Promise.all([
              db.data.findMany({
                 where:{ 
                  userId: user.id
                } 
              }),
              db.note.findMany({
                 where:{
                   userId: user.id} 
              }),
            ])
        
            const items: AllItems[] = [
                ...dataItems.map(item => ({
                  ...item,
                  type: 'data' as const,
                  title: item.title,
                  webSiteLink: item.webSiteLink,
                  username: item.username,
                  password: item.password,
                  notes: item.notes,
                  passwordSecurity: item.passwordSecurity,
                  isDeleted: item.isDeleted,
                })),
                ...noteItems.map(item => ({
                  ...item,
                  type: 'note' as const,
                  noteTitle: item.noteTitle,
                  noteDescription: item.noteDescription,
                  isDeleted: item.isDeleted,
                })),
              ];
        
              items.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        
            return JSON.stringify(items)
            
          } catch (error) {
            console.error("Error fetching items:", error);
            return JSON.stringify({ message: "Error fetching items" });
          }
        }
}
