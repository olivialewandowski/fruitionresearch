// Auth middleware// apps/web/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Example: redirect unauthenticated users
  const isLoggedIn = request.cookies.get('user')
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Optional matcher if you only want middleware on specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}
