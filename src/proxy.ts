import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.services";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }

  // user not authenticated or register
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // user is authenticated but role= ADMIN
  // user can not visit user dashboard
  if (isAdmin && pathname.startsWith("seller-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // // user is authenticated but role= USER
  // user can not visit admin dashboard

  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
