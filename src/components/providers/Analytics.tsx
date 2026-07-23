'use client';

import {GoogleTagManager} from '@next/third-parties/google';
import {useEffect, useState} from 'react';

export const Analytics = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		if ('requestIdleCallback' in window) {
			const id = window.requestIdleCallback(() => setIsClient(true), {
				timeout: 2500,
			});

			return () => window.cancelIdleCallback(id);
		}

		const id = globalThis.setTimeout(() => setIsClient(true), 2500);

		return () => globalThis.clearTimeout(id);
	}, []);

	if (!isClient) return null;

	return (
		<>
			<GoogleTagManager gtmId="GTM-TNKVNFGM" />
		</>
	);
};
