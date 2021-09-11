import React from 'react';
import {AppProps} from 'next/app';

import '../styles/globals.scss';

import Background from "../components/Background";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="bg-base-300 ">
			<Background/>

			<Component {...pageProps} />
		</div>
	);
}
