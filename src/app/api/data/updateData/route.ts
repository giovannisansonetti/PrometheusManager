import { NextRequest, NextResponse } from "next/server";
import { encryptWithKey } from "utils/encryption/encryption";
import checkSecurityPass from "utils/pswsecuritychecker";
import { createClient } from "utils/supabase/server";
import { env } from "~/env";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();

  const { title, webSiteLink, username, password, notes, id } = body;
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return NextResponse.json(
      {
        message: "Unauthorized user",
        error: true,
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
        error: true,
      },
      { status: 404 },
    );
  }

  const encryptedPassword = await encryptWithKey(
    password as string,
    env.AES_KEY,
  );
  const insertData = {
    title,
    webSiteLink,
    username,
    password,
    encryptedPassword,
    notes,
    id,
  };

  const passwordSecurity = checkSecurityPass(insertData.password);
  try {
    await db.data.update({
      where: { id: insertData.id },
      data: {
        title: insertData.title,
        webSiteLink: insertData.webSiteLink,
        username: insertData.username,
        password: insertData.encryptedPassword.data,
        iv: insertData.encryptedPassword.iv,
        notes: insertData.notes,
        passwordSecurity: passwordSecurity,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Item created successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: true,
      },
      { status: 500 },
    );
  }
}