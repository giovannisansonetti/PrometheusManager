import { type NextRequest, NextResponse } from "next/server";
import { encryptWithKey } from "utils/encryption/encryption";
import {
  extractPass,
  keyGeneration,
  extractSalt,
} from "utils/encryption/keysmanagement";
import checkSecurityPass from "utils/pswsecuritychecker";
import { createClient } from "utils/supabase/server";
import {
  type GenericApiResponse,
  type InsertDataRequest,
} from "~/interfaces/api.models";
import { db } from "~/server/db";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GenericApiResponse>> {
  const supabase = createClient();
  const body = (await req.json()) as InsertDataRequest;

  const { title, webSiteLink, username, password, notes } = body;
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

  if (!title || !webSiteLink || !username || !password) {
    return NextResponse.json(
      {
        message: "Missing required fields",
        success: false,
      },
      { status: 400 },
    );
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
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

  // TODO switch to client encryption

  const pass = await extractPass(user.id);
  const salt = await extractSalt(user.id);

  if (pass?.hashed_password && salt?.salt) {
    const key = await keyGeneration(pass?.hashed_password, salt?.salt);
    const encryptedPassword = await encryptWithKey(password, key);

    const insertData = {
      title,
      webSiteLink,
      username,
      password,
      encryptedPassword,
      notes,
    };

    const passwordSecurity = checkSecurityPass(insertData.password);

    try {
      await db.data.create({
        data: {
          userId: user.id,
          title: insertData.title,
          webSiteLink: insertData.webSiteLink,
          username: insertData.username,
          password: insertData.encryptedPassword.data,
          iv: insertData.encryptedPassword.iv,
          notes: insertData.notes,
          passwordSecurity: passwordSecurity,
          isDeleted: false,
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
          success: false,
        },
        { status: 500 },
      );
    }
  }
  return NextResponse.json(
    {
      message: "Internal Server Error",
      success: false,
    },
    { status: 500 },
  );
}
