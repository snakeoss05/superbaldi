import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const currentPath = request.nextUrl.pathname;

  // Retrieve the token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("No token found, redirecting to sign-in.");
    return NextResponse.redirect(new URL("/client/pages/signin", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

    // Verify the token
    const { payload } = await jwtVerify(token, secret);
    const isAdmin = payload.role === "admin";

    // Restrict access to /dashboard routes for non-admins
    if (currentPath.startsWith("/dashboard") && !isAdmin) {
      console.log("User is not an admin, redirecting to sign-in.");
      return NextResponse.redirect(
        new URL("/client/pages/signin", request.url)
      );
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/client/pages/signin", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/client/pages/myaccount/:path*", "/client/pages/cart/checkout"],
};
