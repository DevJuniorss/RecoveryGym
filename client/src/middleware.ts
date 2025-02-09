import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './app/_actions/auth'
import { Role } from './enums/role'

export default async function middleware(req: NextRequest) {
  const protectedRoute = '/teachers'
  const currentPath = req.nextUrl.pathname

  if (currentPath !== '/') {
    const session = await getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if (
      currentPath.startsWith(protectedRoute) &&
      session.user.role !== Role.ADMINISTRATOR
    ) {
      return NextResponse.redirect(new URL('/home', req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
