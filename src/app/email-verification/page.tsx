"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormResponse } from "@/lib/providers/FormResponseProvider";
import { Button } from "@/components/ui/button";
import { MdEmail } from 'react-icons/md';
import { useRouter, useSearchParams } from "next/navigation";
import { SignInSchema, SignUpSchema } from "@/lib/schemas";
import { SignInCredentials, SignUpCredentials } from "@types";
import { updateUserPassword } from "@/app/actions/user.actions";
import { getTokenAndSendEmail } from "@/app/actions/verification.actions";
import { login, register } from "@/app/actions/auth.actions";

function EmailVerificationPage() {
  const searchParams = useSearchParams();
  const referrer = searchParams.get("referrer") || "Unknown";

  const { formResponse } = useFormResponse();

  const router = useRouter();

  const [token, setToken] = useState<string>("");

  const fetchEmailVerificationToken = useCallback( async () => {
    const token = await getTokenAndSendEmail(formResponse?.email);
    setToken(token);
    alert("Confirmation mail sent successfully!");
  }, [formResponse?.email]);
  
  useEffect(() => {
    if(referrer=="Unknown") router.back();
    if(!formResponse?.email){
      alert("Please, make sure that you have filled the sign in form before verifying your email!");
      router.back();
    }
    fetchEmailVerificationToken(); 
  }, [referrer, fetchEmailVerificationToken, formResponse, router]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try { 
      if (inputRef.current && token === inputRef.current.value) {
        if (referrer === "sign-in") {
          const credentials: SignInCredentials = await SignInSchema.parseAsync(formResponse);
          await updateUserPassword(credentials.email, credentials.password);
          const loginResult = await login(credentials);
          alert(loginResult.message);
          if (!loginResult.ok) return;
        } else {
          const credentials: SignUpCredentials = await SignUpSchema.parseAsync(formResponse);
          const registerResult = await register({ credentials, isEmailVerified: true });
          alert(registerResult.message);
          if(!registerResult.ok) return;
        }
        router.push('/');
      } else alert("Invalid verification token, please try again!");
    } catch (error) {
      if(error instanceof Error) alert(error.message);
      alert(`Unexpected error occured on ${referrer}!`);
      console.error(error);
    }
  };

  const handleClick = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchEmailVerificationToken();
  }
  
  return (
    <div className="h-screen grid place-items-center">
      <div className="p-8 bg-background text-foreground rounded-md shadow-lg max-w-md w-full">
        <section className="text-center mb-4">
          <MdEmail className="text-[8rem] mx-auto"/>
          <h2 className="text-3xl font-bold mb-2">Email Verification</h2>
          <p className="text-left font-semibold mb-0.5">Verify the email address:</p>
          <p className="disabled-field">{decodeURIComponent(formResponse?.email)}</p>  
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
                <Button size="lg" className="w-[82px] ml-3" onClick={handleClick}>
                  resend
                </Button>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full">
              continue with {referrer}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
