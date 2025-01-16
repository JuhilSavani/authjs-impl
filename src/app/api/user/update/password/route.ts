import { db } from "@/db";
import { users } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';

export async function PATCH(request: NextRequest){
  try {
    const { email, newPassword }: { email: string; newPassword: string } = await request.json();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // WARN: https://github.com/drizzle-team/drizzle-orm/issues/2472
    await db.update(users).set({ password: hashedPassword }).where(eq(users.email, email));

    return NextResponse.json({ message: 'Password updated successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error updating the password:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating the password!' },
      { status: 500 }
    );
  }
}