import { NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  const request = await req.json();

  const { id, type } = request;

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error("Failed to get user:", error);
    return;
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
  });

  if (user) {
    if (type === "data") {
      try {
        await db.data.delete({
          where: {
            userId: user.id,
            id: id,
          },
        });
        return NextResponse.json(
          {
            success: true,
            message: "Item deleted",
          },
          { status: 200 },
        );
      } catch (error) {
        return NextResponse.json(
          {
            error: true,
            message: "Internal Server Error",
          },
          { status: 500 },
        );
      }
    }

    if (type === "note") {
      try {
        await db.note.delete({
          where: {
            userId: user.id,
            id: id,
          },
        });
        return NextResponse.json(
          {
            success: true,
            message: "Note deleted",
          },
          { status: 200 },
        );
      } catch (error) {
        return NextResponse.json(
          {
            error: true,
            message: "Internal Server Error",
          },
          { status: 500 },
        );
      }
    }

    if (type === "card") {
      try {
        await db.paymentCard.delete({
          where: {
            userId: user.id,
            id: id,
          },
        });
        return NextResponse.json(
          {
            success: true,
            message: "Card deleted",
          },
          { status: 200 },
        );
      } catch (error) {
        return NextResponse.json(
          {
            error: true,
            message: "Internal Server Error",
          },
          { status: 500 },
        );
      }
    }
  }
}
