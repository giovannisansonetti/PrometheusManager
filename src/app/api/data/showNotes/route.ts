import { type Note } from "@prisma/client";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetchNotes();
  if (response.error) {
    return NextResponse.json(
      {
        message: response.message,
        error: true,
      },
      { status: 404 },
    );
  }
  if (response.status === 200) {
    return NextResponse.json(
      { data: response.data },
      { status: response.status },
    );
  }
}

const fetchNotes = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
    return { error: true, message: "User authentication failed", status: 401 };
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
  });

  if (!user) {
    return { error: true, message: "User not found", status: 404 };
  }

  const noteList: Note[] = await db.note.findMany({
    where: {
      userId: user.id,
    },
  });

  if (noteList.length !== 0) {
    return {
      status: 200,
      message: "OK",
      data: noteList,
    };
  }

  return { status: 404, message: "No notes found", error: true };
};
