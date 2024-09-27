import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import {
  type GenericApiResponse,
  type UpdateCardRequest,
} from "~/interfaces/api.models";
import { db } from "~/server/db";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GenericApiResponse>> {
  const supabase = createClient();
  const body = (await req.json()) as UpdateCardRequest;

  const { PAN, expiry, cvv, cardholder, id } = body;
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
    return NextResponse.json(
      {
        message: "Unauthorized user",
        success: false,
      },
      { status: 401 },
    );
  }

  const supabaseUserId = data.user.id;

  const user = await db.user.findUnique({
    where: { id: supabaseUserId },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "User not found",
        success: false,
      },
      { status: 404 },
    );
  }

  const insertCard = {
    PAN,
    expiry,
    cvv,
    cardholder,
    id,
  };

  try {
    await db.paymentCard.update({
      where: { id: insertCard.id, userId: user.id },
      data: {
        PAN: insertCard.PAN,
        expiry: insertCard.expiry,
        CVV: insertCard.cvv,
        cardholder: insertCard.cardholder,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Card edited successfully",
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
