"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SignInCredentials, SignUpCredentials } from "@types";

const baseUrl = `http://localhost:3000`;

export async function login(credentials: SignInCredentials){
  try {
    await signIn("credentials", { ...credentials, redirect: false });
    return { ok: true, message: "Logged in successfully!" };
  } catch (error) {
    if(error instanceof AuthError) return { ok: false, message: error.message.split('.')[0] };
    if(error instanceof Error) return { ok: false, message: error.message };
    return { ok: false, message: "Unexpected error occurred while logging in!" };
  }
}

export async function register({ credentials, isEmailVerified }: { credentials: SignUpCredentials, isEmailVerified: boolean }){
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credentials, isEmailVerified })
    });
    const { message } = await response.json();
    if(!response.ok) return { ok: false, message };
    await signIn("credentials", { ...credentials, redirect: false });
    return { ok: true, message };
  } catch (error) {
    console.error("[auth.actions][register] ", error);
    return { ok: false, message: error instanceof Error ? error.message : "Unexpected error occurred during registration!" };
  }
}