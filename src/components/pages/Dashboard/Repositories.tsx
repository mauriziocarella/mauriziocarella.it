'use client';

import {useEffect, useRef, useState} from 'react';
import {LoadingIcon} from '@/components/ui/Loading/Loading';
import type {Repository} from '@/models/Repository';

type GitHubRepository = {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
};

const getRepositories = async (signal: AbortSignal): Promise<Repository[]> => {
	const response = await fetch(
		'https://api.github.com/users/mauriziocarella/repos?sort=pushed',
		{signal},
	);

	if (!response.ok) {
		throw new Error('Unable to load GitHub repositories');
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
};

export default function Repositories() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [shouldLoad, setShouldLoad] = useState(false);
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const element = containerRef.current;
		if (!element || shouldLoad) return;

		if (typeof IntersectionObserver === 'undefined') {
			const timeout = globalThis.setTimeout(
				() => setShouldLoad(true),
				0,
			);
			return () => globalThis.clearTimeout(timeout);
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;

				setShouldLoad(true);
				observer.disconnect();
			},
			{rootMargin: '400px 0px'},
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [shouldLoad]);

	useEffect(() => {
		if (!shouldLoad) return;

		const controller = new AbortController();

		getRepositories(controller.signal)
			.then(setRepositories)
			.catch((error: unknown) => {
				if (error instanceof DOMException && error.name === 'AbortError') {
					return;
				}

				setRepositories([]);
			})
			.finally(() => {
				if (!controller.signal.aborted) {
					setIsLoading(false);
				}
			});

		return () => controller.abort();
	}, [shouldLoad]);

	return (
		<div ref={containerRef}>
			<div className="container mx-auto px-4 py-10">
				<h1 className="text-4xl font-bold mb-8">My Repositories</h1>

				<div>
					{shouldLoad && isLoading ? (
						<LoadingIcon className="mx-auto" />
					) : !repositories?.length ? (
						<></>
					) : (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{repositories?.map((repository) => (
								<div
									key={repository.id}
									className="border bg-background-800 rounded-2xl p-6 flex flex-col transition duration-500 ease-in-out transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.018] hover:shadow-lg">
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
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
