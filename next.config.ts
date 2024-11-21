import type {NextConfig} from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
	output: 'standalone',
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
	},
};

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
