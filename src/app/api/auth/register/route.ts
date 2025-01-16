import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/models';
import { getUserByEmail } from '@/app/actions/user.actions'; 
import { SignUpCredentials } from '@types';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { credentials, isEmailVerified }: { credentials: SignUpCredentials; isEmailVerified: boolean } = await req.json();

    const getUserResult = await getUserByEmail(credentials.email);
    if (getUserResult.ok) {
      return NextResponse.json({ message: 'Email is already in use, please enter another email!' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(credentials.password, 10); // TODO: hash the password

    await db.insert(users).values({
      ...credentials,
      password: hashedPassword,
      isVerified: isEmailVerified,
      provider: 'credentials',
    });
    
    return NextResponse.json({ message: 'Registered successfully!' }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: 'Unexpected error occurred during registration!' }, 
      { status: 500 }
    );
  }
}