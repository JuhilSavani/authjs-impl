import { db } from "@/db";
import { users } from "@/db/models";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';

export async function PATCH(request: NextRequest){
  try {
    const { email, detailsToUpdate } = await request.json();

    if(detailsToUpdate.password)
      detailsToUpdate.password = await bcrypt.hash(detailsToUpdate.password as string, 10);
    
    if (detailsToUpdate.emailVerified) // INFO: Due to JSON.stringify
      detailsToUpdate.emailVerified = new Date(detailsToUpdate.emailVerified as string); 
    
    // WARN: https://github.com/drizzle-team/drizzle-orm/issues/2472
    await db.update(users).set(detailsToUpdate).where(eq(users.email, email as string));

    return NextResponse.json({ message: 'Password updated successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error updating the password:', error);
    return NextResponse.json(
      { message: 'An error occurred while updating the password!' },
      { status: 500 }
    );
  }
}