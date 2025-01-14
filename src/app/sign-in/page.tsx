"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Socials } from "@/components/Socials";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/lib/schemas";
import { SignInCredentials } from "@types";

export default function SignInPage() {
  const form = useForm<SignInCredentials>({
    resolver: zodResolver(SignInSchema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  async function submitHandler(formData: SignInCredentials) {
    console.log(`submitted signin form with: 
      \n ${JSON.stringify(formData, null, 2)} \n
    `);
  }

  return (
    <div className="h-screen grid place-items-center">
      <div className="p-8 bg-background text-foreground rounded-md shadow-lg max-w-md w-full">
        {/* Welcome Section */}
        <section className="mb-6 text-center">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-lg text-gray-500">
            Please sign in to your account
          </p>
        </section>

        {/* Sign-In Form */}
        <section className="py-6 border-t border-b border-gray-300 dark:border-gray-700">
          <form onSubmit={handleSubmit(submitHandler)} noValidate>
            <div className={`form-control ${errors.email && "invalid"}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  setValueAs: (value) => value.trim(),
                })}
                placeholder="you@example.com"
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className={`form-control ${errors.password && "invalid"}`}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  setValueAs: (value) => value.trim(),
                })}
                placeholder="Enter your password"
              />
              <p>{errors.password?.message}</p>
            </div>

            <Button type="submit" size="lg" className="w-full mt-2">
              continue
            </Button>
          </form>
        </section>

        {/* Social Login Buttons */}
        <section className="flex gap-4 pt-6">
          <Socials />
        </section>

        {/* Sign-Up Link */}
        <section className="text-center mt-4">
          <p className="text-sm">
            Don&apos;t have an account?
            <Link href="/sign-up">
              <Button variant="link">Sign up</Button>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
