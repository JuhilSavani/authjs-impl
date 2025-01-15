"use server"

import { db } from '@/db/index'; 
import { users } from '@/db/models'; 
import { eq } from 'drizzle-orm';

export async function getUserById(id: string){
  try {
    const result = await db.select().from(users).where(eq(users.id, id));
    if (!result || result.length === 0) {
      return { ok: false, message: 'Account is not available over the provided details', user: null };
    }
    return { ok: true, message: 'Accoun found successfully' , user: result[0] };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { ok: false, message: 'An error occurred while fetching the account detail', user: null };
  }
}

export async function getUserByEmail(email: string){
  try {
    const result = await db.select().from(users).where(eq(users.email, email));
    if (!result || result.length === 0) {
      return { ok: false, message: 'User not found', user: null };
    }
    return { ok: true, message: 'Account found successfully', user: result[0] };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { ok: false, message: 'An error occurred while fetching the account detail', user: email };
  }
}