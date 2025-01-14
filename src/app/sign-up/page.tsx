"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Socials } from "@/components/Socials";
import { SignUpSchema } from "@/lib/schemas";
import { SignUpCredentials } from "@types";
import { useFormResponse } from "@/lib/providers/FormResponseProvider";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const form = useForm<SignUpCredentials>({
    resolver: zodResolver(SignUpSchema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

   const router = useRouter();
  const { setFormResponse } = useFormResponse();

  async function submitHandler(formData: SignUpCredentials) {
    console.log(`submitted signup form with: 
      \n ${JSON.stringify(formData, null, 2)} \n
    `);
    setFormResponse(formData);
    router.push(`verify/${formData.email}`) 
  }

  return (
    <div className="grid place-items-center">
      <div className="my-20 p-8 bg-background text-foreground rounded-md shadow-lg max-w-lg w-full">
        {/* Welcome Section */}
        <section className="mb-4 text-center">
          <h2 className="text-3xl font-bold">Hello, There!</h2>
          <p className="text-lg text-gray-500">
            Create an account to explore our further.
          </p>
        </section>

        {/* Sign-up Form */}
        <section className="py-4 border-t border-b border-gray-300 dark:border-gray-700">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className={`form-control ${errors.firstName && "invalid"}`}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  setValueAs: (value) => value.trim(),
                })}
                placeholder="Enter your first name"
              />
              <p>{errors.firstName?.message}</p>
            </div>
            <div className="form-control">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", {
                  setValueAs: (value) => value.trim(),
                })}
                placeholder="Enter your last name"
              />
            </div>
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
                {...register("password")}
                placeholder="Enter your password"
              />
              <p>{errors.password?.message}</p>
            </div>

            <Button type="submit" size="lg" className="w-full my-2">
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
            Already have an account?
            <Link href="/sign-in">
              <Button variant="link">Sign in</Button>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
