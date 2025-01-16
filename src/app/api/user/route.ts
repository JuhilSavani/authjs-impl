import { db } from "@/db";
import { users } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    await db.insert(users).values(reqBody);
    return NextResponse.json({ message: "User details stored successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Error occured while storing the user details!" }, { status: 500 });
  }
}