import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/auth';

/**
 * Gates /admin behind the password session and retires the old /dashboard URLs.
 * Runs on every matched request, independent of whether Supabase is configured —
 * the admin panel must never be publicly reachable.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/dashboard/, '/admin');
    return NextResponse.redirect(url);
  }

  const isLogin = pathname === '/admin/login';
  const authed = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);

  if (!authed && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = pathname === '/admin' ? '' : `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  if (authed && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.headers.set('x-robots-tag', 'noindex, nofollow');
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
