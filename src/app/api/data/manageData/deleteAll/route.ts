import { NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { type GenericApiResponse } from "~/interfaces/api.models";
import { db } from "~/server/db";

export async function POST(): Promise<NextResponse<GenericApiResponse>> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
    console.error("Failed to get user:", error);
    return NextResponse.json(
      {
        message: "Unauthorized user",
        success: false,
      },
      { status: 401 },
    );
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
  });

  if (user) {
    try {
      await db.data.deleteMany({
        where: {
          userId: user.id,
          isDeleted: true,
        },
      });
      await db.note.deleteMany({
        where: {
          userId: user.id,
          isDeleted: true,
        },
      });
      await db.paymentCard.deleteMany({
        where: {
          userId: user.id,
          isDeleted: true,
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "Items deleted",
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
          success: false,
        },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    {
      message: "User not found",
      success: false,
    },
    { status: 404 },
  );
}
