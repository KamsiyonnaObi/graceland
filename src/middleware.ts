import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: "/account/:path*",
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
  });
  if (request.nextUrl.pathname === "/account") {
    return NextResponse.redirect(
      new URL("/account/personal-details", request.url),
    );
  }
  if (!token) return NextResponse.redirect(new URL("/login", request.url));
}
