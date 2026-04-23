import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth';

const protectedRoutes = ['/dashboard', '/admin', '/api/v1/tasks'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    // 🚫 No token
    if (!token) {
      if (!pathname.startsWith('/api')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ✅ OPTIONAL: basic format check (not real verification)
    if (token.split('.').length !== 3) {
      if (!pathname.startsWith('/api')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // ⚠️ DO NOT verify JWT here (Edge limitation)
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon|apple-icon).*)',
  ],
};