import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import {
  type DeleteTypeRequest,
  type GenericApiResponse,
} from "~/interfaces/api.models";
import { db } from "~/server/db";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GenericApiResponse>> {
  const request = (await req.json()) as DeleteTypeRequest;

  const { id, type } = request;

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
            success: false,
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
            success: false,
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
            success: false,
            message: "Internal Server Error",
          },
          { status: 500 },
        );
      }
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
