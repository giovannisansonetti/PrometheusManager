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

  const supabaseUserId = data.user.id;

  const user = await db.user.findUnique({
    where: { id: supabaseUserId },
  });

  if (user) {
    if (type === "data") {
      try {
        await db.data.update({
          where: {
            userId: supabaseUserId,
            id: id,
          },
          data: {
            isDeleted: true,
          },
        });
        return NextResponse.json({
          success: true,
          status: 200,
          message: "Item moved to trashbin",
        });
      } catch (error) {
        return NextResponse.json({
          status: 500,
          error: true,
          message: "Internal Server Error",
        });
      }
    }

    if (type === "note") {
      try {
        await db.note.update({
          where: {
            userId: supabaseUserId,
            id: id,
          },
          data: {
            isDeleted: true,
          },
        });
        return NextResponse.json({
          success: true,
          status: 200,
          message: "Note moved to trashbin",
        });
      } catch (error) {
        return NextResponse.json({
          status: 500,
          error: true,
          message: "Internal Server Error",
        });
      }
    }
  }
}
