'use client';

import {Link} from '@/components/ui/Link/Link';
import {useMemo} from 'react';
import {Site} from '@/lib/site';
import Icon from '@/components/ui/Icons/Icon';
import {ArrowUpRightIcon} from 'lucide-react';
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
			{
				id: 3,
				name: 'httpbin',
				description:
					'Inspect incoming HTTP requests and configure endpoint responses',
				url: 'https://httpbin.tools.mauriziocarella.it',
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
						<Link
							key={app.id}
							href={new URL(app.url, Site.url)}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`View ${app.name}`}
							className="group block h-full w-full rounded-2xl font-normal text-inherit hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0">
							<SpotlightCard
								as={Container3D}
								containerClassName="card-border-trace h-full cursor-pointer"
								className="flex flex-col">
								<h2 className="text-xl font-semibold">
									{app.name}
								</h2>
								<p className="flex-1 opacity-80 mt-2">
									{app.description}
								</p>
								<span className="mt-4 inline-flex w-fit items-center gap-2 font-medium text-accent group-hover:underline underline-offset-2">
									View App
									<Icon
										name={ArrowUpRightIcon}
										className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
									/>
								</span>
							</SpotlightCard>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
