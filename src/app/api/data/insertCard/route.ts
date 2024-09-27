import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import {
  type InsertCardRequest,
  type InsertCardResponse,
} from "~/interfaces/api.models";
import { db } from "~/server/db";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<InsertCardResponse>> {
  const supabase = createClient();
  const body = (await req.json()) as InsertCardRequest;

  const { PAN, expiry, CVV, cardholder, type } = body;
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
    return NextResponse.json(
      {
        message: "Unauthorized user",
        error: true,
      },
      { status: 401 },
    );
  }

  if (!PAN || !expiry || !CVV || !cardholder || !type) {
    return NextResponse.json(
      {
        message: "Missing required fields",
        error: true,
      },
      { status: 400 },
    );
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "User not found",
        error: true,
      },
      { status: 404 },
    );
  }
  try {
    await db.paymentCard.create({
      data: {
        PAN,
        expiry,
        CVV,
        cardholder,
        type: type,
        userId: user.id,
        isDeleted: false,
      },
    });
    return NextResponse.json(
      {
        message: "Card added successfully",
        error: false,
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
