import { AllItems } from "~/server/data/showdata/allitems.models";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";
import { NextRequest, NextResponse } from "next/server";
import { decryptWithKey } from "utils/encryption/encryption";
import { env } from "~/env";

export async function GET(req: NextRequest) {
  const response = await fetchAllitems();
  if (response.error) {
    return NextResponse.json({
      status: 404,
      message: response.message,
      error: true,
    });
  }
  if (response.status === 200) {
    return NextResponse.json({ data: response.data, status: response.status });
  }
}

const fetchAllitems = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error("Failed to get user:", error);
    return { error: true, message: "User authentication failed" };
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
  });

  if (!user) {
    return { error: true, message: "User not found" };
  }

  try {
    const [dataItems, noteItems] = await Promise.all([
      db.data.findMany({
        where: {
          userId: user.id,
        },
      }),
      db.note.findMany({
        where: {
          userId: user.id,
        },
      }),
    ]);
    for (const data of dataItems) {
      data.password = await decryptWithKey(data.iv, data.password, env.AES_KEY);
      console.log(data.password);
    }
    const items: AllItems[] = [
      ...dataItems.map((item) => ({
        ...item,
        type: "data" as const,
        title: item.title,
        webSiteLink: item.webSiteLink,
        username: item.username,
        password: item.password,
        notes: item.notes,
        passwordSecurity: item.passwordSecurity,
        isDeleted: item.isDeleted,
      })),
      ...noteItems.map((item) => ({
        ...item,
        type: "note" as const,
        noteTitle: item.noteTitle,
        noteDescription: item.noteDescription,
        isDeleted: item.isDeleted,
      })),
    ];

    items.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return { status: 200, message: "Data found", data: items };
  } catch (error) {
    return { status: 500, message: "Internal Server Error", error: true };
  }
};
