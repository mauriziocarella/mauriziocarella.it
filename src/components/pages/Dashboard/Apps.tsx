'use client';

import {Card} from '@/components/ui/Card/Card';
import {Link} from '@/components/ui/Link/Link';
import {useMemo} from 'react';
import {Site} from '@/lib/site';
import Icon from '@/components/ui/Icons/Icon';
import {MoveRightIcon} from 'lucide-react';
import {SpotlightCard} from '@/components/ui/Card/SpotlightCard';
import {Container3D} from '@/components/ui/Containers/Container3D';

export default function Apps() {
	const apps = useMemo(
		() => [
			{
				id: 1,
				name: 'Password Generator',
				description: 'Simple offline password generator',
				url: '/apps/password-generator',
			},
			{
				id: 2,
				name: 'Beam!',
				description: 'Share text or links via qrcode or public list',
				url: 'https://beam.mauriziocarella.it',
			},
		],
		[],
	);

	return (
		<div>
			<div className="container mx-auto px-4 py-10">
				<h1 className="text-4xl font-bold mb-8">My Apps</h1>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{apps?.map((app) => (
						<SpotlightCard
							as={Container3D}
							key={app.id}
							className="flex flex-col">
							<h2 className="text-xl font-semibold">
								{app.name}
							</h2>
							<p className="flex-1 opacity-80 mt-2">
								{app.description}
							</p>
							<Link
								href={new URL(app.url, Site.url)}
								target="_blank"
								className="mt-4">
								View App <Icon name={MoveRightIcon} />
							</Link>
						</SpotlightCard>
					))}
				</div>
			</div>
		</div>
	);
}
