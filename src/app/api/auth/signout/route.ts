import { createClient } from "utils/supabase/server";
import { NextResponse } from "next/server";
import {
  type FailedSignOutResponse,
  type SuccessfulSignOutResponse,
} from "~/interfaces/api.models";

export async function GET(): Promise<
  NextResponse<SuccessfulSignOutResponse> | NextResponse<FailedSignOutResponse>
> {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (!error) {
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      message: "User not found",
    },
    { status: 404 },
  );
}
