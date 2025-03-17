import '../styles/globals.scss';
import type {Metadata, Viewport} from 'next';
import {type PropsWithChildren, Suspense} from 'react';
import AppProviders from '@/components/providers';
import {Lato} from 'next/font/google';
import clsx from '@/lib/clsx';
import {generateMetadata} from '@/lib/site';
import {Analytics} from '@/components/Analytics';
import {Footer} from '@/components/Footer';
import {LoadingOverlay} from '@/components/Loading';
import {SiteHead} from '@/components/Site';

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

const RootLayout = ({children}: PropsWithChildren) => (
	<html className={clsx(lato.className)} lang="en" suppressHydrationWarning>
		<SiteHead />
		<body className="flex flex-col">
			<AppProviders>
				<main className="flex flex-col flex-1">
					<Suspense fallback={<LoadingOverlay delay={1} />}>
						{children}
					</Suspense>
				</main>

				<Footer />
			</AppProviders>

			<Analytics />
		</body>
	</html>
);

export default RootLayout;
