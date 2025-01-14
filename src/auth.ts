import NextAuth from "next-auth"
import authConfig from "@auth.config"
 
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
    async signIn({ user, account }) {
      console.log(`called signIn({ user, account })`);

      if (["google", "github"].includes(account?.provider as string)) {
        return true;
      }
      return true;
    },

    async jwt({ token, user }) {
      console.log(`called session({ token, user })`);

      const now = Math.floor(Date.now() / 1000);

      if (user) {
        token.issuedAt = now;
        // ...
      }

      const tokenAge = now - (token.issuedAt as number ?? 0); 
      if (tokenAge > TOKEN_EXPIRY) return null; 

      return token;
    },

    async session({ session, token }) {
      console.log(`called session({ session, token })`);
      return session;
    },
    
  },
});