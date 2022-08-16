import React from 'react';
import Head from 'next/head';

interface MetaProps {
	title?: string;
}

const Meta = (props: MetaProps) => {
	let title = `Maurizio Carella | Web developer`;
	const description = `Ciao! I am a 5 years experienced full stack developer with skills with React, NodeJS, Laravel, MySQL, MongoDB. Contact me for further information`;

	if (props.title) {
		title += ` - ${props.title}`;
	}

	return (
		<Head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta
				name="keywords"
				content="maurizio carella, github, projects, developer, mobile, web, website, frontend, backend, fullstack, react, nodejs, laravel, php, javascript, mysql, mongodb"
			/>
			<meta name="description" content={description} />
			<meta name="robots" content="index, follow" />

			<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			<meta httpEquiv="content-language" content="it" />

			<meta name="author" content="Maurizio Carella" />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content="https://mauriziocarella.it/images/header.png" />
			<meta property="og:url" content="https://mauriziocarella.it" />

			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content="https://mauriziocarella.it/images/header.png" />
			<meta name="twitter:card" content="summary_large_image" />

			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />

			<title>{title}</title>
		</Head>
	);
};

export default Meta;
