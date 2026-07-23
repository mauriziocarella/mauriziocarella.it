import {Site} from '@/lib/site';
import {DashboardCard} from './DashboardCard';

export default function Apps() {
	const apps = [
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
	];

	return (
		<div id="apps">
			<div className="container mx-auto px-4 py-10">
				<h1 className="text-4xl font-bold mb-8">My Apps</h1>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{apps?.map((app) => (
						<DashboardCard
							key={app.id}
							contentClassName="flex flex-col">
							<h2 className="text-xl font-semibold">
								{app.name}
							</h2>
							<p className="flex-1 opacity-80 mt-2">
								{app.description}
							</p>
							<a
								href={new URL(app.url, Site.url).toString()}
								target="_blank"
								className="inline-flex items-center w-fit gap-2 text-accent hover:underline underline-offset-2 font-medium transition-colors mt-4">
								View App
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="size-5"
									aria-hidden="true">
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</a>
						</DashboardCard>
					))}
				</div>
			</div>
		</div>
	);
}
