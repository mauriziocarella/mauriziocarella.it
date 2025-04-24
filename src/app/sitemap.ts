import type {MetadataRoute} from 'next';
import {Site} from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: '/',
		},
		{
			url: '/apps/password-generator',
		},
	].map(({url}) => ({
		url: new URL(url, Site.url).toString(),
	}));
}
