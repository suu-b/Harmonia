import { access } from 'fs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some((path) => pathname === path);

  const accessToken =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  if (!isPublic && !accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPublic && accessToken) {
    return NextResponse.redirect(new URL('/welcome-user', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|fonts|public|api/auth|auth).*)'],
};
