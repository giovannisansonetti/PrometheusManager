"use server"
import { createClient } from "utils/supabase/server";
import { type AddItemsProps } from "~/components/Dashboard/DisplayData/interfaces/AddItem.models";
import { db } from "~/server/db";

export default async function insertData(formProps: AddItemsProps) {
  const supabase = createClient();
  const { data: authData, error } = await supabase.auth.getUser();

  if (error || !authData.user) {
    console.error("Failed to get user:", error);
    return
  }

  const supabaseUserId = authData.user.id;

  const user = await db.user.findUnique({
    where: { id: supabaseUserId },
  })

  if (!user) {
    console.error("User not found in database");
    return
  }

  const insertData = {
    title: formProps.title as string,
    webSiteLink: formProps.webSiteLink as string,
    username: formProps.username as string,
    password: formProps.password as string,
    notes: formProps.notes as string,
  }

  try {
    await db.data.create({
      data: {
        userId: user.id,
        title: insertData.title,
        webSiteLink: insertData.webSiteLink,
        username: insertData.username,
        password: insertData.password,
        notes: insertData.notes,
      },
    });
    
  } catch (dbError) {
      return JSON.stringify({error: "Internal Server Error"})
  }
}
