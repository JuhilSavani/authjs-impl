"use client";

import { use, useEffect, useRef, useState } from "react";
import { useFormResponse } from "@/lib/providers/FormResponseProvider";
import { Button } from "@/components/ui/button";
import { MdEmail } from 'react-icons/md';
import { useRouter } from "next/navigation";

function EmailVerificationPage(
  { params }: { params: Promise<{ email: string }> }
) {
  const resolvedParams = use(params);
  const { email } = resolvedParams;

  const { formResponse } = useFormResponse();

  const router = useRouter();

  useEffect(() => {
    // TODO: get the verification token from the backend
    if(!formResponse?.email) router.back() // TODO: alert "Please, make sure that you have filled the sign in form before verifying your email!"
  }, [formResponse, router]);

  const [token, setToken] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: compare the verification token here
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="p-8 bg-background text-foreground rounded-md shadow-lg max-w-md w-full">
        <section className="text-center mb-4">
          <MdEmail className="text-[8rem] mx-auto"/>
          <h2 className="text-3xl font-bold mb-2">Email Verification</h2>
          <p className="text-left font-semibold mb-0.5">Verify the email address:</p>
          <p className="disabled-field">{decodeURIComponent(email)}</p>  
          <p>Please check your inbox for a verification email.</p> 
          <p>If you haven&apos;t received it, you can request a new one.</p>
        </section>
        <section>
          <form onSubmit={handleSubmit} noValidate>
            <div className={"form-control"}>
              <label htmlFor="email">Email Verification Token: </label>
              <div className="flex">
                <input
                  type="text"
                  id="evt"
                  name="evt"
                  placeholder="e.g. 123456"
                  ref={inputRef}
                />
                <Button size="lg" className="w-[82px] ml-3">
                  resend
                </Button>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full">
              continue
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
