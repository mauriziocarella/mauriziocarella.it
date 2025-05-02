'use client';

import {GoogleTagManager} from '@next/third-parties/google';
import Script from 'next/script';
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
			<Script id="iubenda-init" strategy="afterInteractive">
				{`var _iub = _iub || [];
            _iub.csConfiguration = {
			    "askConsentAtCookiePolicyUpdate": true,
			    "enableFadp": true,
			    "enableLgpd": true,
			    "fadpApplies": true,
			    "floatingPreferencesButtonDisplay": "anchored-center-left",
			    "perPurposeConsent": true,
			    "preferenceCookie": {
			        "expireAfter": 180
			    },
			    "siteId": 2756161,
			    "storage": {
			        "useSiteId": true
			    },
			    "usPreferencesWidgetDisplay": "inline-center",
			    "whitelabel": false,
			    "cookiePolicyId": 53338723,
			    "lang": "it",
			    "floatingPreferencesButtonCaption": true,
			    "banner": {
			        "acceptButtonDisplay": true,
			        "closeButtonDisplay": false,
			        "customizeButtonDisplay": true,
			        "explicitWithdrawal": true,
			        "listPurposes": true,
			        "ownerName": "mauriziocarella.it",
			        "position": "float-bottom-center",
			        "rejectButtonDisplay": true,
			        "showPurposesToggles": true,
			        "showTotalNumberOfProviders": true
			    }
			}`}
			</Script>
			<Script
				strategy="afterInteractive"
				src="//cs.iubenda.com/autoblocking/2756161.js"
				type="text/javascript"
			/>
			<Script
				strategy="afterInteractive"
				src="//cdn.iubenda.com/cs/iubenda_cs.js"
				type="text/javascript"
			/>
		</>
	);
};
