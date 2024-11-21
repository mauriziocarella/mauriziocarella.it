import {NextRequest, NextResponse} from 'next/server';
import {Site} from '@/lib/site';

export function middleware(req: NextRequest) {
	const host = req.headers.get('host');

	if (host) {
		const [subdomain] = host.split('.');

		switch (subdomain) {
			case 'password': {
				const url = new URL(Site.url);
				url.pathname = '/apps/password-generator';
				return NextResponse.redirect(url);
			}
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/:path*',
};
