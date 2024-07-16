"use server"

import { db } from "~/server/db"

export default async function insertData(formData: FormData) {

    const data = {
        webSiteLink: formData.get("webSiteLink") as string,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        notes: formData.get("notes") as string
    }

   await db.data.create({
        data: {
            webSiteLink: data.webSiteLink,
            username: data.username,
            password: data.password,
            notes: data.notes
        }
   })

}