import '../globals.scss';
import type {Metadata, Viewport} from 'next';
import type {PropsWithChildren} from 'react';
import AppProviders from '@/utils/providers';
import {Lato} from 'next/font/google';
import clsx from '@/lib/clsx';
import {generateMetadata} from '@/lib/site';
import {Analytics} from '@/components/Analytics';
import {Footer} from '@/components/Footer';

const lato = Lato({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({children}: Readonly<PropsWithChildren>) {
	return (
		<html
			className={clsx(lato.className)}
			lang="en"
			suppressHydrationWarning>
			<head>
				<link
					rel="icon"
					type="image/png"
					href="/favicon-96x96.png"
					sizes="96x96"
				/>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<meta
					name="apple-mobile-web-app-title"
					content="mauriziocarella.it"
				/>
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className="flex flex-col">
				<AppProviders>
					<main className="flex flex-col flex-1">{children}</main>

					<Footer />
				</AppProviders>

				<Analytics />
			</body>
		</html>
	);
}
