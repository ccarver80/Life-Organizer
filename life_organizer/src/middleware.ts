// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get('currentUser')?.value
//   console.log(request.cookies)
//   if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//     return Response.redirect(new URL('/dashboard', request.url))
//   }
 
//   if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
//     return Response.redirect(new URL('/login', request.url))
//   }
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/dashboard',
// }

//middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === '/') {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  console.log(session)

  const isProtected = path.includes('/dashboard');

  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (session && (path === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  return NextResponse.next();
}