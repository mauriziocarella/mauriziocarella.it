import type {Metadata} from 'next';

export const Site = {
	title: 'Maurizio Carella',
	description: 'My personal website',
	url: new URL('https://mauriziocarella.it'),
};

export const generateMetadata = (
	metadata: Partial<Metadata> = {},
): Metadata => {
	const {title} = metadata;

	return {
		description: Site.description,
		...metadata,
		title: [title, Site.title].filter(Boolean).join(' • '),
	};
};
