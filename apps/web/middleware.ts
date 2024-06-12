import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	const token = req.cookies.get('token')?.value;
	if (req.url.includes('_next')) return; // next unexpected tokem

	if (!token) {
		console.log('no token');

		if (req.nextUrl.pathname === '/sign-in') {
			return NextResponse.next();
		}

		return NextResponse.redirect(new URL('/sign-in', req.url), { status: 303 });
	}

	if (token && req.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/products', req.url), { status: 303 });
	}
}

export const config = {
	matcher: ['/me', '/products/:slug*', '/products', '/'],
};
