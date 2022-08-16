import React, {useEffect} from 'react';
import type {AppProps} from 'next/app';

import '../styles/globals.scss';

import Background from '../components/Background';
import Meta from '../components/Meta';
import {PrivacyPolicy} from '../components/PrivacyPolicy';

const App = ({Component, pageProps}: AppProps) => {
	useEffect(() => {
		document.documentElement.classList.add('bg-base-300');
	}, []);

	return (
		<>
			<Meta />

			<Background />

			<Component {...pageProps} />

			<PrivacyPolicy />
		</>
	);
};

export default App;
