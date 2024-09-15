import { Data } from "@prisma/client";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";
import { NextRequest, NextResponse } from "next/server";
import { decryptWithKey } from "utils/encryption/encryption";
import { env } from "~/env";

export async function GET(req: NextRequest) {
  const response = await fetchData();
  if (response.error) {
    return NextResponse.json(
      {
        message: response.message,
        error: true,
      },
      { status: 500 },
    );
  }
  if (response.status === 200) {
    return NextResponse.json(
      { data: response.data },
      { status: response.status },
    );
  }
}

const fetchData = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error("Failed to get user:", error);
    return { error: true, message: "User authentication failed", status: 401 };
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
  });

  if (!user) {
    return { error: true, message: "User not found", status: 404 };
  }

  const dataList: Data[] = await db.data.findMany({
    where: {
      userId: user.id,
    },
  });

  for (const data of dataList) {
    data.password = await decryptWithKey(data.iv, data.password, env.AES_KEY);
  }

  if (dataList.length !== 0) {
    return { status: 200, message: "OK", data: dataList };
  }

  return { status: 404, message: "No data found", error: true };
};
