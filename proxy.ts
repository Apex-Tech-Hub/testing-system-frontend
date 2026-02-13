// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // // 1. Check if the user is trying to access any admin route
  // if (pathname.startsWith('/admin-dashboard')) {
    
  //   // 2. Get the user role (This is usually stored in a Cookie or JWT)
  //   const userRole = request.cookies.get('user-role')?.value;

  //   // 3. If they aren't an admin, send them to the login or user dashboard
  //   if (userRole !== 'ADMIN') {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
  // }

  return NextResponse.next();
}

// Only run this proxy on admin routes
export const config = {
  matcher: '/admin-dashboard/:path*',
};