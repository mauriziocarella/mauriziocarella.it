'use client';

import {GoogleTagManager} from '@next/third-parties/google';
import {useEffect, useState} from 'react';

export const Analytics = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setTimeout(() => setIsClient(true), 100);
	}, []);

	if (!isClient) return null;

	return (
		<>
			<GoogleTagManager gtmId="GTM-TNKVNFGM" />
		</>
	);
};
