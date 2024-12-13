import { type NextRequest, NextResponse } from "next/server";
import { encryptWithKey } from "utils/encryption/encryption";
import {
  extractPass,
  extractSalt,
  keyGeneration,
} from "utils/encryption/keysmanagement";
import { createClient } from "utils/supabase/server";
import {
  type InsertNotesRequest,
  type GenericApiResponse,
} from "~/interfaces/api.models";
import { db } from "~/server/db";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GenericApiResponse>> {
  const supabase = createClient();
  const body = (await req.json()) as InsertNotesRequest;

  const { title, description } = body;
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

  if (!title || !description) {
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

  const pass = await extractPass(user.id);
  const salt = await extractSalt(user.id);

  if (pass?.hashed_password && salt?.salt) {
    const key = await keyGeneration(pass.hashed_password, salt.salt);

    const encryptedTitle = await encryptWithKey(title, key);
    const encryptedDescription = await encryptWithKey(description, key);

    await db.note.create({
      data: {
        userId: user.id,
        noteTitle: encryptedTitle.data,
        noteDescription: encryptedDescription.data,
        titleIV: encryptedTitle.iv,
        descriptionIV: encryptedDescription.iv,
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
  }
  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    { status: 500 },
  );
}
