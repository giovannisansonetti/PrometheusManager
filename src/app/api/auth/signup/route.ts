import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";
import { NextRequest, NextResponse } from "next/server";
import getIp from "utils/retrieveInfo/info";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const response = await req.json();
  const { email, masterPass, phoneNumber } = response;

  if (!email || !masterPass) {
    return NextResponse.json(
      {
        message: "Email or password not received",
        error: true,
      },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: masterPass,
  });

  const ip = await getIp();

  if (!error && data.user) {
    await db.user.create({
      data: {
        id: data.user?.id,
        email: email,
        phoneNumber: phoneNumber,
      },
    });
    await db.userLoginHistory.create({
      data: {
        userId: data.user.id,
        ipAddress: ip,
        deviceInfo: "no device",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered",
      },
      { status: 200 },
    );
  }

  if (error && error.code === "weak_password") {
    return NextResponse.json(
      {
        error: true,
        message: "Password is too short",
      },
      { status: 400 },
    );
  }

  if (error && error.code === "user_already_exists") {
    return NextResponse.json(
      {
        error: true,
        message: "Email already registered",
      },
      { status: 400 },
    );
  }

  if (error && error.code === "validation_failed") {
    return NextResponse.json(
      {
        error: true,
        message: "Invalid email format",
      },
      { status: 400 },
    );
  }
}
