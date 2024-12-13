import { type Note } from "@prisma/client";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import {
  extractPass,
  extractSalt,
  keyGeneration,
} from "utils/encryption/keysmanagement";
import { decryptWithKey } from "utils/encryption/encryption";

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

  const pass = await extractPass(user.id);
  const salt = await extractSalt(user.id);
  try {
    if (pass?.hashed_password && salt?.salt) {
      const key = await keyGeneration(pass.hashed_password, salt.salt);

      for (const note of noteList) {
        note.noteTitle = await decryptWithKey(
          note.titleIV,
          note.noteTitle,
          key,
        );
        note.noteDescription = await decryptWithKey(
          note.descriptionIV,
          note.noteDescription,
          key,
        );
      }
      if (noteList.length !== 0) {
        return { status: 200, message: "OK", data: noteList };
      }
      return { status: 404, message: "No notes found", error: true };
    }

    return {
      status: 500,
      message: "Decryption failed due to missing data",
      error: true,
    };
  } catch {
    return { status: 500, message: "Internal Server Error", error: true };
  }
};
