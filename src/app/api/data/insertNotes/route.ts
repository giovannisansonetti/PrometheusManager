import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import {
  type InsertNotesResponse,
  type FailedInsertNotesResponse,
  type InsertNotesRequest,
} from "~/interfaces/api.models";
import { db } from "~/server/db";

export async function POST(
  req: NextRequest,
): Promise<
  NextResponse<InsertNotesResponse> | NextResponse<FailedInsertNotesResponse>
> {
  const supabase = createClient();
  const body = (await req.json()) as InsertNotesRequest;

  const { title, description } = body;
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
    return NextResponse.json(
      {
        message: "Unauthorized user",
        error: true,
      },
      { status: 401 },
    );
  }

  if (!title || !description) {
    return NextResponse.json(
      {
        message: "Missing required fields",
        error: true,
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
        error: true,
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
