import '../styles/globals.css';
import type {Metadata, Viewport} from 'next';
import {type PropsWithChildren} from 'react';
import AppProviders from '@/components/providers';
import {Lato} from 'next/font/google';
import clsx from '@/lib/clsx';
import {generateMetadata} from '@/lib/site';
import {Analytics} from '@/components/providers/Analytics';
import {Footer} from '../components/layout/Footer';

const lato = Lato({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

const RootLayout = ({children}: PropsWithChildren) => (
	<html className={clsx(lato.className)} lang="en" suppressHydrationWarning>
		<body className="flex flex-col">
			<AppProviders>
				<main className="flex flex-col flex-1">
					{children}
				</main>

				<Footer />
			</AppProviders>

			<Analytics />
		</body>
	</html>
);

export default RootLayout;
