import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/",
]

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
  const isPrivateRoute = !publicRoutes.includes(request.nextUrl.pathname);

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
	if (!sessionCookie && isPrivateRoute) {
		// return NextResponse.redirect(new URL("/login?redirect=" + request.url, request.url));
		return NextResponse.redirect(new URL("/login", request.url));

	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
			APIルート（/api）や、各種画像ファイル（png, jpg, jpeg, gif, svg, webp, ico など）、
			Next.jsの静的ファイル（/_next/static, /_next/image）を除外します。
			通常のページルートのみを対象にします。
		*/
		"/((?!api|_next/static|_next/image|favicon\\.ico|llms\\.txt|.*\\.(png|jpg|jpeg|gif|svg|webp|ico|bmp|tiff|avif)).*)",
	]
};