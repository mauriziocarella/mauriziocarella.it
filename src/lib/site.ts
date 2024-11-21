import type {Metadata} from 'next';

export const Site = {
	url: new URL('https://mauriziocarella.it'),
};

export const generateMetadata = (
	metadata: Partial<Metadata> = {},
): Metadata => {
	const {title} = metadata;

	return {
		description: 'My personal website',
		...metadata,
		title: [title, 'Maurizio Carella'].filter(Boolean).join(' • '),
	};
};
