import React from 'react';
import './globals.scss';

import {Metadata} from 'next';
import {PrivacyPolicy} from '../components/PrivacyPolicy';

export const metadata: Metadata = {
	title: 'Maurizio Carella | Web developer',
	description:
		'Ciao! I am a 5 years experienced full stack developer with skills with React, NodeJS, Laravel, MySQL, MongoDB. Contact me for further information',
	keywords:
		'maurizio carella, github, projects, developer, mobile, web, website, frontend, backend, fullstack, react, nodejs, laravel, php, javascript, mysql, mongodb',
	viewport: 'width=device-width, initial-scale=1.0',
	robots: 'index, follow',
	authors: {
		url: 'https://mauriziocarella.it',
		name: 'Maurizio Carella',
	},
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
	return (
		<html lang="en">
			<body className="bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-50 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-neutral-500 dark:scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 dark:scrollbar-track-neutral-700 overflow-y-auto pr-0.5">
				<div id="root">{children}</div>

				<PrivacyPolicy />
			</body>
		</html>
	);
};

export default RootLayout;
