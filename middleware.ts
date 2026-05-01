import { NextRequest, NextResponse } from 'next/server'

const PASSWORD = process.env.SITE_PASSWORD ?? 'gw2026'
const COOKIE = 'gw_auth'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 認証ページと静的ファイルはスルー
  if (pathname.startsWith('/login') || pathname.startsWith('/_next') || pathname.startsWith('/cover')) {
    return NextResponse.next()
  }

  const cookie = req.cookies.get(COOKIE)
  if (cookie?.value === PASSWORD) {
    return NextResponse.next()
  }

  const loginUrl = req.nextUrl.clone()
  loginUrl.pathname = '/login'
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
