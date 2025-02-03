import NextAuth from "next-auth"
import authConfig from "@auth.config"
import { getUserByEmail, saveUserDetails } from "@/app/actions/user.actions";

const TOKEN_EXPIRY = 60 * 60;

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/sign-in'
  },
  session: {
    strategy: "jwt",
    maxAge: TOKEN_EXPIRY
    // updateAge: <number>,
  },
  callbacks: {
    async signIn({ user, account }) { // INFO: user depends on what is return as profile by the provider
      if (["google", "github"].includes(account?.provider as string)) {
        const [firstName, lastName] = (user?.name?.split(' ') ?? ["", ""]);
        try {
          const getUserResult = await getUserByEmail(user?.email as string);
          if (!getUserResult.ok) {
            const saveUserResult = await saveUserDetails({
              firstName,
              lastName,
              email: user?.email as string,
              emailVerified: new Date(),
              provider: account?.provider as "google" | "github",
            });
            if(saveUserResult.ok) return true;
          }
        } catch { return false; }
      }
      return true;
    },
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);

      if (user) { 
        token.issuedAt = now;
        token.user = user;
      }

      const tokenAge = now - (token.issuedAt as number ?? 0); 
      if (tokenAge > TOKEN_EXPIRY) return null; 

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});