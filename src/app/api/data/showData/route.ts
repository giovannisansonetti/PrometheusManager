import { Data } from "@prisma/client"
import { createClient } from "utils/supabase/server"
import { db } from "~/server/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const response = await fetchData()
    if (response.error) {
      return NextResponse.json({ status: 500 })
    }
    return NextResponse.json(response.data, { status: response.status })
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 })
  }
}

const fetchData = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    console.error("Failed to get user:", error)
    return { error: true, message: "User authentication failed" }
  }

  const user = await db.user.findUnique({
    where: { id: data.user.id },
  })

  if (!user) {
    return { error: true, message: "User not found" }
  }

  const dataList: Data[] = await db.data.findMany({
    where: {
      userId: user.id,
    },
  })

  if (dataList.length === 0) {
    return { message: "No data found" }
  }

  return {
    status: 200,
    message: "OK",
    data: dataList
  }
}
