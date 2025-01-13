"use client"

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Socials = () => {

  async function handleClick(provider: "google" | "github") {
    console.log(`\n called handleClick(${provider}) \n`);
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
