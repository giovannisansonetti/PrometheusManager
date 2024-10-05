import { type NextRequest, NextResponse } from "next/server";
import getIp from "utils/retrieveInfo/info";
import { createClient } from "utils/supabase/server";
import {
  type GenericApiResponse,
  type SignInRequest,
} from "~/interfaces/api.models";
import { db } from "~/server/db";
import { UAParser } from "ua-parser-js";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GenericApiResponse>> {
  const supabase = createClient();
  const response = (await req.json()) as SignInRequest;
  const { email, masterPass } = response;
  const ip = await getIp();
  const ua = req.headers.get("user-agent") ?? "";
  const parser = new UAParser(ua);
  const result = parser.getResult();

  if (!email || !masterPass) {
    return NextResponse.json(
      {
        message: "Missing information",
        success: false,
      },
      { status: 400 },
    );
  }

  const signIndata = {
    email: email,
    password: masterPass,
  };

  const { data, error } = await supabase.auth.signInWithPassword(signIndata);

  if (!error && data.user) {
    await db.userLoginHistory.create({
      data: {
        userId: data.user.id,
        ipAddress: ip,
        browser: `${result.browser.name ?? "Unknown"} ${result.browser.version ?? ""}`,
        os: `${result.os.name ?? "Unknown"} ${result.os.version ?? ""}`,
      },
    });
    return NextResponse.json(
      { success: true, message: "User logged in" },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      message: "Invalid Credentials",
      success: false,
    },
    { status: 400 },
  );
}
