import { createClient } from '@/utils/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession()

  const { data: { user } } = await supabase.auth.getUser();

  const protectedPaths = [
    '/admin-dashboard',
    '/teacher-dashboard',
    '/student-dashboard',
    '/parent-dashboard'
  ];

  const isProtectedRoute = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // if user is not signed in and is trying to access a protected route, redirect to login
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if user is signed in and the current path is /login, /signup, or /forgot-password, redirect the user to their dashboard
  if (user && ['/login', '/signup', '/forgot-password'].includes(request.nextUrl.pathname)) {
    // get user role from profiles table
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile) {
        return NextResponse.redirect(new URL(`/${profile.role}-dashboard`, request.url));
    }
    // if no profile, maybe redirect to a profile setup page or homepage
    return NextResponse.redirect(new URL('/', request.url));
  }


  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
