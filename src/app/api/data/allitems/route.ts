import { AllItems } from "~/server/data/showdata/allitems.models";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";
import { NextRequest, NextResponse } from "next/server";
import { decryptWithKey } from "utils/encryption/encryption";
import { env } from "~/env";

export async function GET(req: NextRequest) {
  const response = await fetchAllitems();
  if (response.error) {
    return NextResponse.json(
      {
        message: response.message,
        error: true,
      },
      { status: 404 },
    );
  }
  if (response.status === 200) {
    return NextResponse.json(
      { data: response.data },
      { status: response.status },
    );
  }
}

const fetchAllitems = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error("Failed to get user:", error);
    return { error: true, message: "User authentication failed", status: 401 };
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
  });

  if (!user) {
    return { error: true, message: "User not found", status: 404 };
  }

  try {
    const [dataItems, noteItems, paymentCardItems] = await Promise.all([
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
      db.paymentCard.findMany({ where: { userId: user.id } }),
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
      ...paymentCardItems.map((item) => ({
        ...item,
        type: "paymentCard" as const,
        PAN: item.PAN,
        cardholder: item.cardholder,
        cardType: item.type,
        expiry: item.expiry,
        CVV: item.CVV,
        isDeleted: item.isDeleted,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    ];

    items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return { status: 200, message: "Data found", data: items };
  } catch (error) {
    return { status: 500, message: "Internal Server Error", error: true };
  }
};
