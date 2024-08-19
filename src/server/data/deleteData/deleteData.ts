"use server"
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export default async function(dataId: string){
    const supabase = createClient()
    const { data: authData, error } = await supabase.auth.getUser()

    if (error || !authData.user) {
        console.error("Failed to get user:", error);
        return
    }

    const supabaseUserId = authData.user.id

    const user = await db.user.findUnique({
        where: { id: supabaseUserId },
    })

    if(user){
        
    }


}