import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;

  const { pathname } = request.nextUrl;

  if (accessToken && refreshToken && ["/login", "/verify"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if ((!accessToken || !refreshToken) && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/verify"],
};
