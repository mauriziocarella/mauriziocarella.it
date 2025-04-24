import type {MetadataRoute} from 'next';
import {Site} from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: new URL('/sitemap.xml', Site.url).toString(),
	};
}
