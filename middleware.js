import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = 'Nirbhjaaauisyrhgo8q3784563784';

// Convert secret to `Uint8Array` (required for jose)
const encoder = new TextEncoder();
const secret = encoder.encode(JWT_SECRET);

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  // Remove dashboard from protected routes since we're removing it
  const protectedRoutes = ['/assignment', '/write'];
  const adminOnlyRoutes = ['/assignment'];

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    console.log('Token found:', !!token);

    if (!token) {
      console.log('No token, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const decoded = await verifyToken(token);
    console.log('Token decoded:', !!decoded, decoded?.role);

    if (!decoded) {
      console.log('Invalid token, redirecting to login');
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }

    if (adminOnlyRoutes.some(route => pathname.startsWith(route))) {
      if (decoded.role !== 'admin') {
        console.log('Non-admin access denied to admin-only route, redirecting to write');
        return NextResponse.redirect(new URL('/write', request.url));
      }
    }

    // Add user info to headers for use in components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-email', decoded.email);
    requestHeaders.set('x-user-role', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Redirect authenticated users away from login/signup to appropriate page
  if (pathname === '/login' || pathname === '/signup') {
    if (token) {
      const decoded = await verifyToken(token);
      if (decoded) {
        console.log('Authenticated user trying to access login/signup');
        // Redirect based on role
        const redirectPath = decoded.role === 'admin' ? '/write' : '/write';
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/assignment/:path*',
    '/write/:path*',
    '/login',
    '/signup',
  ],
};