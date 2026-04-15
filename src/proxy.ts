import { NextRequest, NextResponse } from "next/server";

import { Roles } from "./constants/roles";
import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;
  let isCustomer = false;
  let isSeller = false;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
  }
  const userData = data?.user?.role;

  if (userData === Roles.admin) {
    isAdmin = true;
  } else if (userData === Roles.seller) {
    isSeller = true;
  } else {
    isCustomer = true;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdmin && pathname.startsWith("/seller-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (isAdmin && pathname.startsWith("/customer-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (isSeller && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  if (isSeller && pathname.startsWith("/customer-dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  if (isCustomer && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  if (isCustomer && pathname.startsWith("/seller-dashboard")) {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/customer-dashboard",
    "/customer-dashboard/:path*",
  ],
};
