import Credentials from "next-auth/providers/credentials";
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import { SignInSchema } from '@/lib/schemas'
import { getUserByEmail } from "@/app/actions/user.actions";
import bcrypt from 'bcryptjs';

export default { 
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = await SignInSchema.parseAsync(credentials);

        const getUserResult = await getUserByEmail(email);
        if (!getUserResult.ok) throw new CredentialsSignin(getUserResult.message);

        if(!getUserResult.user!.isVerified)
          throw new CredentialsSignin("Please verify your email to continue further!");

        if(getUserResult.user!.provider !== "credentials" && !getUserResult.user.password) 
          throw new CredentialsSignin(`Please verify your email or try to sign in with ${getUserResult.user!.provider}!`);

        const isMatch = await bcrypt.compare(password, getUserResult.user.password as string);
        if (!isMatch) throw new CredentialsSignin("Invalid password!");

        return {
          id: getUserResult.user.id,
          name: getUserResult.user?.firstName  + ' ' + getUserResult.user?.lastName,
          email: getUserResult.user!.email,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;