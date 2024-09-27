import { type NextRequest, NextResponse } from "next/server";
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

  const insertNote = {
    title,
    description,
  };

  await db.note.create({
    data: {
      userId: user.id,
      noteTitle: insertNote.title,
      noteDescription: insertNote.description,
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
