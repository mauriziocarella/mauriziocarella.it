import {GoogleTagManager} from '@next/third-parties/google';

export const Analytics = () => (
	<>
		<GoogleTagManager gtmId="GTM-TNKVNFGM" />
		{/*<Script id="iubenda">*/}
		{/*	{`var _iub = _iub || [];_iub.csConfiguration = {"ccpaAcknowledgeOnDisplay":true,"consentOnContinuedBrowsing":false,"countryDetection":true,"enableCcpa":true,"floatingPreferencesButtonDisplay":"anchored-bottom-right","floatingPreferencesButtonIcon":false,"invalidateConsentWithoutLog":true,"perPurposeConsent":true,"siteId":2756161,"whitelabel":false,"cookiePolicyId":53338723,"lang":"it","floatingPreferencesButtonCaption":true,"banner":{"acceptButtonDisplay":true,"closeButtonDisplay":false,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-bottom-center","rejectButtonDisplay":true}};`}*/}
		{/*</Script>*/}
		{/*<Script src="//cs.iubenda.com/sync/2756161.js" />*/}
		{/*<Script src="//cdn.iubenda.com/cs/ccpa/stub.js" />*/}
		{/*<Script src="//cdn.iubenda.com/cs/iubenda_cs.js" />*/}
	</>
);
