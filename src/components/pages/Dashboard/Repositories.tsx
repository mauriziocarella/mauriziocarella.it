import type {Repository} from '@/models/Repository';
import {DashboardCard} from './DashboardCard';

type GitHubRepository = {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
};

const getRepositories = async (): Promise<Repository[]> => {
	try {
		const response = await fetch(
			'https://api.github.com/users/mauriziocarella/repos?sort=pushed',
			{
				headers: {
					Accept: 'application/vnd.github+json',
				},
				next: {
					revalidate: 15 * 60,
				},
			},
		);

		if (!response.ok) {
			return [];
		}

		const repositories = (await response.json()) as GitHubRepository[];

		return repositories.map((repository) => ({
			id: String(repository.id),
			name: repository.name,
			description: repository.description ?? '',
			url: repository.html_url,
			stars: repository.stargazers_count,
			forks: repository.forks_count,
		}));
	} catch {
		return [];
	}
};

export default async function Repositories() {
	const repositories = await getRepositories();

	return (
		<div>
			<div className="container mx-auto px-4 py-10">
				<h1 className="text-4xl font-bold mb-8">My Repositories</h1>

				<div>
					{!repositories?.length ? (
						<></>
					) : (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{repositories?.map((repository) => (
								<DashboardCard
									key={repository.id}
									contentClassName="flex flex-col">
									<h2 className="text-xl font-semibold">
										{repository.name}
									</h2>
									<p className="flex-1 opacity-80 mt-2">
										{repository.description}
									</p>

									<div className="flex flex-wrap mt-2">
										{repository.stars > 0 && (
											<span className="inline-flex items-center gap-2">
												<svg
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="size-5"
													aria-hidden="true">
													<path d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.12a.56.56 0 0 0 .47.34l5.53.44a.56.56 0 0 1 .32.98l-4.21 3.6a.56.56 0 0 0-.18.55l1.29 5.39a.56.56 0 0 1-.84.61l-4.73-2.89a.56.56 0 0 0-.58 0l-4.73 2.89a.56.56 0 0 1-.84-.61l1.29-5.39a.56.56 0 0 0-.18-.55l-4.21-3.6a.56.56 0 0 1 .32-.98l5.53-.44a.56.56 0 0 0 .47-.34z" />
												</svg>
												{repository.stars}
											</span>
										)}
									</div>

									<a
										href={repository.url}
										target="_blank"
										className="inline-flex items-center w-fit gap-2 text-accent hover:underline underline-offset-2 font-medium transition-colors mt-4">
										View on GitHub
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
					)}
				</div>
			</div>
		</div>
	);
}
