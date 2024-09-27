import { NextResponse } from "next/server";
import { createClient } from "utils/supabase/server";
import { db } from "~/server/db";
import { decryptWithKey } from "utils/encryption/encryption";
import { env } from "~/env";

export async function GET() {
  const response = await fetchHealthCheck();
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

const fetchHealthCheck = async () => {
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

  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 90);

  if (error) {
    console.log(error);
  }

  if (data.user) {
    const weakPasswords = await db.data.findMany({
      select: {
        id: true,
        password: true,
        passwordSecurity: true,
        iv: true,
      },
      where: {
        userId: user.id,
        OR: [
          { passwordSecurity: "Very Weak" },
          { passwordSecurity: "Weak" },
          { passwordSecurity: "Very Weak - Common Password" },
        ],
        isDeleted: false,
      },
    });

    const oldPasswords = await db.data.findMany({
      select: {
        id: true,
        password: true,
        createdAt: true,
        iv: true,
      },
      where: {
        userId: data.user.id,
        createdAt: {
          gte: sixtyDaysAgo,
        },
        isDeleted: false,
      },
    });

    /*const reusedPasswords = await db.data.groupBy({

            select: {
                id: true,
                password: true,
            },
            where: {
                userId: data.user.id,
                isDeleted: false,
                
            },
            orderBy: {
                password: 'asc',
            },
            having: {
                password: {
                    _count: {
                        gt: 1 
                    }
                }
            }
        })*/
    for (const weakPassword of weakPasswords) {
      weakPassword.password = await decryptWithKey(
        weakPassword.iv,
        weakPassword.password,
        env.AES_KEY,
      );
    }
    for (const oldPassword of oldPasswords) {
      oldPassword.password = await decryptWithKey(
        oldPassword.iv,
        oldPassword.password,
        env.AES_KEY,
      );
    }
    const healthcheck = {
      weakPasswords: weakPasswords,
      oldPasswords: oldPasswords,
      //reusedPasswords: reusedPasswords
    };

    return {
      status: 200,
      message: "OK",
      data: healthcheck,
    };
  }

  return { status: 404, message: "", error: true };
};
