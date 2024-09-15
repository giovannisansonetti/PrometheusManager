import { CardType } from "@prisma/client";
import { NextRequest } from "next/server";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();

  const { PAN, expiry, CVV, cardholder, type } = body;
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return Response.json(
      {
        message: "Unauthorized user",
        error: true,
      },
      { status: 401 },
    );
  }

  if (!PAN || !expiry || !CVV || !cardholder || !type) {
    return Response.json(
      {
        message: "Missing required fields",
        error: true,
      },
      { status: 400 },
    );
  }

  const supabaseUserId = data.user.id;

  const user = await db.user.findUnique({
    where: { id: supabaseUserId },
  });

  if (!user) {
    return Response.json(
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
        type: type as CardType,
        userId: user.id,
        isDeleted: false,
      },
    });
    return Response.json(
      {
        message: "Card added successfully",
        error: false,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Internal Server Error",
        error: true,
      },
      { status: 500 },
    );
  }
}
