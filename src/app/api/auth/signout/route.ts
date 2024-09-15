import { createClient } from "utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (!error) {
    return NextResponse.json({
      status: 200,
      success: true,
    });
  }

  return NextResponse.json(
    {
      message: "User not found",
    },
    { status: 404 },
  );
}
