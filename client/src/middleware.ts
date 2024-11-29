import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.customKey);

export async function middleware(request: NextRequest) {
  // Extract token from cookies
  const token = request.cookies.get("token")?.value;

  // If there's no token, proceed without interruption
  if (!token) {
    return NextResponse.next();
  }
  const response = NextResponse.next();

  try {
    // Verify the token using the 'jose' library
    const { payload } = await jwtVerify(token, SECRET_KEY);
    // console.log(payload.user);

    // If the token is valid, proceed and add custom headers if needed
    const userId =
      typeof payload.user === "string"
        ? payload.user
        : JSON.stringify(payload.user);

    response.headers.set("x-user-id", userId || "");

    return response;
  } catch (error) {
    console.error("Token verification failed:", error);

    // If the token is invalid, delete it from cookies and redirect to login
    response.cookies.delete("token");
    return response;
  }
}

// Apply the middleware to specific routes
export const config = {
  matcher: "/request",
};
