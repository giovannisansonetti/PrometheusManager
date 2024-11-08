import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";
import { type NextRequest, NextResponse } from "next/server";
import getIp from "utils/retrieveInfo/info";
import {
  type GenericApiResponse,
  type SignUpRequest,
} from "~/interfaces/api.models";
import UAParser from "ua-parser-js";
import argon2 from "argon2";
import * as crypto from "crypto";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GenericApiResponse>> {
  const supabase = createClient();
  const response = (await req.json()) as SignUpRequest;
  const { email, masterPass, phoneNumber } = response;
  const ua = req.headers.get("user-agent") ?? "";
  const parser = new UAParser(ua);
  const result = parser.getResult();

  if (!email || !masterPass) {
    return NextResponse.json(
      {
        message: "Email or password not received",
        success: false,
      },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: masterPass,
  });

  const ip = await getIp();

  // generate the key with the plain text pass

  const hashedPass = (await argon2.hash(masterPass)).toString(); // will be used as a key to encrypt and decrypt data
  const salt = crypto.randomBytes(16).toString("hex"); // random salt that will be used for the key derivation

  if (!error && data.user) {
    await db.user.create({
      data: {
        id: data.user?.id,
        hashed_password: hashedPass,
        salt: salt,
        email: email,
        phoneNumber: phoneNumber,
      },
    });
    await db.userLoginHistory.create({
      data: {
        userId: data.user.id,
        ipAddress: ip,
        browser: `${result.browser.name ?? "Unknown"} ${result.browser.version ?? ""}`,
        os: `${result.os.name ?? "Unknown"} ${result.os.version ?? ""}`,
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
        success: false,
        message: "Password is too short",
      },
      { status: 400 },
    );
  }

  if (error && error.code === "user_already_exists") {
    return NextResponse.json(
      {
        success: false,
        message: "Email already registered",
      },
      { status: 400 },
    );
  }

  if (error && error.code === "validation_failed") {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email format",
      },
      { status: 400 },
    );
  }
  return NextResponse.json(
    {
      success: false,
      message: "An error occurred, ",
    },
    { status: 500 },
  );
}
