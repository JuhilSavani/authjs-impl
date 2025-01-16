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