"use server"
import { Data } from "@prisma/client";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export async function fetchData(){
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
        try {
            const data: Data[] = await db.data.findMany({
                where: {
                    userId: user.id
                }
            })
            if(data.length !== 0){
                return JSON.stringify(data)
            }
            return JSON.stringify({message: "No data saved"})
            
    }catch(error){
        return
    }
    }
    
}