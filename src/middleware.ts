import { auth } from "@/auth"; 
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Fetch the session using `auth`
  const session = await auth();

  // Allow certain routes to bypass authentication
  if (
    url.pathname.startsWith("/api/auth") ||
    url.pathname.startsWith("/api/user")
  ) return NextResponse.next();

  // Check if the user is logged in
  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) {
    // If unauthenticated, handle API and non-API routes differently
    if (url.pathname.startsWith("/api")) {
      return NextResponse.json({ message: `[${url.pathname}] Unauthorized! ` }, { status: 401 });
    } else {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }
  // Proceed with the request if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.*\\.[\\w]+$|_next|sign-in|sign-up|email-verification).*)", 
    "/",                                           
    "/api/:path*",                                 
    "/trpc/:path*",                                
  ],
};

// ALTERNATE ----

// customize the authorization logic by adding an authorized callback if needed
// export { auth as middleware } from "@/auth" 

// --------------