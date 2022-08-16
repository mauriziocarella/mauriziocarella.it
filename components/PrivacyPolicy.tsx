export const PrivacyPolicy = () => {
	return (
		<>
			<script
				type="text/javascript"
				dangerouslySetInnerHTML={{
					__html: `
						var _iub = _iub || [];
						_iub.csConfiguration = {"ccpaAcknowledgeOnDisplay":true,"consentOnContinuedBrowsing":false,"countryDetection":true,"enableCcpa":true,"floatingPreferencesButtonDisplay":"anchored-bottom-right","floatingPreferencesButtonIcon":false,"invalidateConsentWithoutLog":true,"perPurposeConsent":true,"siteId":2756161,"whitelabel":false,"cookiePolicyId":53338723,"lang":"it","floatingPreferencesButtonCaption":true, "banner":{ "acceptButtonDisplay":true,"closeButtonDisplay":false,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-bottom-center","rejectButtonDisplay":true }};
					`,
				}}
			/>
			<script async type="text/javascript" src="//cdn.iubenda.com/cs/ccpa/stub.js"></script>
			<script async type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8"></script>
		</>
	);
};
