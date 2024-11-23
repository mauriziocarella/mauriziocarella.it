import {Site} from '@/lib/site';

export type SiteHeadProps = {
	title?: string | boolean;
};
export const SiteHead = ({title}: SiteHeadProps) => (
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
		<meta name="apple-mobile-web-app-title" content="mauriziocarella.it" />
		{Boolean(process.env.NEXT_PUBLIC_APP_VERSION) && (
			<meta
				name="version"
				content={process.env.NEXT_PUBLIC_APP_VERSION}
			/>
		)}
		<link rel="manifest" href="/site.webmanifest" />

		{typeof title === 'string' ? (
			<title>{title}</title>
		) : (
			Boolean(title) && <title>{Site.title}</title>
		)}
	</head>
);
