import { NextRequest, NextResponse } from "next/server";
import getIp from "utils/retrieveInfo/info";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const response = await req.json();
  const { email, masterPass } = response;
  const ip = await getIp();

  if (!email || !masterPass) {
    return NextResponse.json({
      status: 400,
      message: "Missing information",
      error: true,
    });
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
        deviceInfo: "no device",
      },
    });
    return NextResponse.json(
      { success: true, message: "User logged in" },
      { status: 200 },
    );
  }

  return NextResponse.json({
    status: 400,
    message: "Invalid Credentials",
    error: true,
  });
}
