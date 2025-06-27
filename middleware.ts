import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // If user is trying to access dashboard routes
    if (pathname.startsWith('/dashboard')) {
      // Check if user is authenticated
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }

      // For email provider users, check if email is verified
      // Google OAuth users are automatically verified
      if (token.provider === 'email' && !token.emailVerified) {
        return NextResponse.redirect(new URL('/auth/signin?error=EmailNotVerified', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow access to public routes
        if (!pathname.startsWith('/dashboard')) {
          return true
        }

        // Require authentication for dashboard routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*'
  ]
} 