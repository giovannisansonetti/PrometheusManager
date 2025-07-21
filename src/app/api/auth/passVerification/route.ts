import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { type GenericApiResponse } from "~/interfaces/api.models";
import { db } from "~/server/db";

export async function GET(): Promise<NextResponse<GenericApiResponse>> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
    console.error("Failed to get user:", error);

    return NextResponse.json(
      {
        error: true,
        message: "Failed to get user",
        success: false,
      },
      { status: 400 },
    );
  }

  const verificationHashDb = await db.user.findUnique({
    where: {
      id: data.user.id,
    },
    select: {
      verificationHash: true,
      salt: true,
    },
  });

  if (verificationHashDb) {
    return NextResponse.json(
      {
        message: "",
        success: true,
        data: verificationHashDb,
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      message: "Verification Hash or Salt not found",
      success: false,
    },
    { status: 404 },
  );
}
