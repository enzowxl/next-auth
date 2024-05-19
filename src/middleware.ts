import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const homeURL = new URL('/', req.url)
  const dashboardURL = new URL('/dashboard', req.url)

  if (!token) {
    if (req.nextUrl.pathname === '/') {
      return NextResponse.next()
    }

    return NextResponse.redirect(homeURL)
  }

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(dashboardURL)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
