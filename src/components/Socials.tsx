"use client"

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";

export const Socials = () => {

  async function handleClick(provider: "google" | "github") {
    console.log(`\n handleClick(${provider}) \n`);
    try {
      await signIn(provider, { redirectTo: '/' });
    } catch (error) {
      if(error instanceof AuthError) alert(error.message);
    }
  }
  
  return (
    <>
      <Button size="lg" className="w-full" aria-label="Sign in with GitHub" onClick={() => handleClick("github")}>
        <FaGithub />
        GitHub
      </Button>
      <Button size="lg" className="w-full" aria-label="Sign in with Google" onClick={() => handleClick("google")}>
        <FcGoogle />
        Google
      </Button>
    </>
  );
};
