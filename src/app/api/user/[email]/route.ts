import { db } from "@/db";
import { users } from "@/db/models";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ email: string }> }) {
  try {
    const { email } = await params;
    const result = await db.select().from(users).where(eq(users.email, email));
    if (!result || result.length === 0) {
      return NextResponse.json({ message: 'Account is not available over the provided details', user: null }, { status: 404 });
    }
    return NextResponse.json({ message: 'Account found successfully', user: result[0] });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return NextResponse.json({ message: 'An error occurred while fetching the account detail', user: null }, { status: 500 });
  }
}