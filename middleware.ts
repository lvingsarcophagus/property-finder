import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of public routes that don't require authentication
const publicRoutes = [
  "/login", 
  "/signup", 
  "/", 
  "/auth-debug",
  "/auth-test", 
  "/auth-test-detailed",
  "/comprehensive-test",
  "/preferences-test",
  "/env-test",
  "/supabase-test",
  "/login-test",
  "/connection-test",
  "/test-supabase"
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is a public route or a static asset
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/placeholder.svg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".gif") ||
    pathname.endsWith(".webp")

  // If it's a public route or static asset, allow access
  if (isPublicRoute || isStaticAsset) {
    console.log(`Middleware: Allowing access to ${pathname}, Auth session: None`)
    return NextResponse.next()
  }

  // For demo purposes, we'll allow access to all routes since we're using localStorage auth
  // In a real Supabase implementation, you would check for actual Supabase session cookies
  console.log(`Middleware: Allowing access to ${pathname} (Demo mode)`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
