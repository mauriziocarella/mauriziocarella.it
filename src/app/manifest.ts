import {MetadataRoute} from 'next';
import {Site} from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: Site.title,
		short_name: 'MC',
		description: Site.description,
		start_url: '/',
		display: 'standalone',
		theme_color: '#ffffff',
		background_color: '#ffffff',
		icons: [
			{
				src: '/icons/logo.png',
				sizes: '96x96',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/icons/apple-icon.png',
				sizes: '180x180',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/icons/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icons/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	};
}
