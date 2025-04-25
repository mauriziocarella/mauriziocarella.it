import type {Metadata} from 'next';

export const Site = {
	title: 'Maurizio Carella',
	description: 'My personal website',
	name: 'mauriziocarella.it',
	url: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mauriziocarella.it',
	),
};

export const generateMetadata = (
	metadata: Partial<Metadata> = {},
): Metadata => {
	const {title} = metadata;

	return {
		description: Site.description,
		...metadata,
		title: [title, Site.title].filter(Boolean).join(' • '),
		other: {
			version: process.env.NEXT_PUBLIC_APP_VERSION,
		},
		appleWebApp: {
			title: Site.title,
		},
		icons: {
			icon: '/icons/favicon.ico',
			apple: '/icons/apple-icon.png',
		},
	};
};
