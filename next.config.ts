import type {NextConfig} from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
	output: 'standalone',
	async redirects() {
		return [
			{
				source: '/privacy',
				destination: 'https://www.iubenda.com/privacy-policy/53338723',
				permanent: false,
			},
			{
				source: '/cookie-policy',
				destination:
					'https://www.iubenda.com/privacy-policy/53338723/cookie-policy',
				permanent: false,
			},
		];
	},
	experimental: {
		inlineCss: true,
	},
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
	},
	images: {
		localPatterns: [
			{
				pathname: '/images/**',
				search: '',
			},
		],
	},
};

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
