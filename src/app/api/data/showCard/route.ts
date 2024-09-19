import { PaymentCard } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export async function GET(req: NextRequest) {
  const response = await fetchCards();
  if (response.error) {
    return NextResponse.json({
      status: response.status,
      message: response.message,
      error: true,
    });
  }
  if (response.status === 200) {
    return NextResponse.json(
      { data: response.data },
      { status: response.status },
    );
  }
}

const fetchCards = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return { error: true, message: "User authentication failed", status: 401 };
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
  });

  if (!user) {
    return { error: true, message: "User not found", status: 404 };
  }

  const cardList: PaymentCard[] = await db.paymentCard.findMany({
    where: {
      userId: user.id,
    },
  });

  if (cardList.length !== 0) {
    return { status: 200, message: "OK", data: cardList };
  }

  return { status: 404, message: "No data found", error: true };
};
