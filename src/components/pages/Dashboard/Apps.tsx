'use client';

import {Card} from '@/components/Card';
import {Link} from '@/components/Link';
import {useMemo} from 'react';

export default function Apps() {
	const apps = useMemo(
		() => [
			{
				id: 1,
				name: 'Password Generator',
				description: 'Simple offline password generator',
				url: '/password-generator',
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
						<Card key={app.id} className="flex flex-col">
							<h2 className="text-xl font-semibold">
								{app.name}
							</h2>
							<p className="flex-1 opacity-80 mt-2">
								{app.description}
							</p>
							<Link
								href={`/apps/${app.url}`}
								target="_blank"
								className="mt-4">
								View App →
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
