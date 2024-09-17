import { NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error("Failed to get user:", error);
    return;
  }

  const supabaseUserId = data.user.id;

  const user = await db.user.findUnique({
    where: { id: supabaseUserId },
  });

  if (user) {
    try {
      await db.data.updateMany({
        where: {
          userId: data.user.id,
          isDeleted: true,
        },
        data: {
          isDeleted: false,
        },
      });
      await db.note.updateMany({
        where: {
          userId: data.user.id,
          isDeleted: true,
        },
        data: {
          isDeleted: false,
        },
      });
      await db.paymentCard.updateMany({
        where: {
          userId: data.user.id,
          isDeleted: true,
        },
        data: {
          isDeleted: false,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Items restored",
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
          error: true,
        },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    {
      message: "User not found",
      error: true,
    },
    { status: 404 },
  );
}
