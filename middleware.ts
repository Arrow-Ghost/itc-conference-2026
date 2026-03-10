import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedPaths = [
  "/dashboard",
  "/fellowship/application",
  "/fellowship/register",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is protected
  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  
  //  __session cookie is the only cookie Firebase Hosting forwards, and
  // is commonly used in Firebase deployments. We also check for a custom
  // auth token cookie that can be set from the client after login.
  const authSession =
    request.cookies.get("__session")?.value ||
    request.cookies.get("firebase-auth-token")?.value;

  if (!authSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Auth cookie exists — allow the request through
  // Note: The actual token verification happens client-side via Firebase SDK.
  // This middleware acts as a first-pass gate to prevent unauthenticated
  // users from even loading protected page assets.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/fellowship/application/:path*",
    "/fellowship/register/:path*",
  ],
};
