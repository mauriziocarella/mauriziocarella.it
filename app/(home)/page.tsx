import React from 'react';
import classNames from 'classnames';
import fs from 'fs/promises';

import {RepositoryType} from '../../types/Repository';
import {AppType} from '../../types/App';

import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import path from 'path';
import Link from 'next/link';
import {Profile} from './profile';
import {Navbar} from './navbar';
import {Card} from '../../components/Card';
import {Tooltip} from '../../components/Tooltip';

type RepositoryProps = React.ComponentProps<'div'> & {repository: RepositoryType};
const Repository = ({repository, className, ...props}: RepositoryProps) => {
	return (
		<article className={classNames(className)} {...props}>
			<Link rel="noopener noreferrer" href={repository.url} target="_blank">
				<Card className="hover:bg-base-200 hover:dark:bg-base-dark-200 hover:shadow-xl transition-all duration-200 h-full">
					<div className="text-2xl font-semibold mb-2">{repository.name}</div>
					<div className="flex-grow font-light mb-2 break-words tracking-wide">{repository.description}</div>
					<div className="flex flex-wrap items-center py-2">
						<Tooltip
							className="flex items-center mr-3"
							text={`Last update:\n${new Date(repository.updated_at).toString()}`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div className="text-sm ml-1">{new Date(repository.updated_at).toDateString()}</div>
						</Tooltip>
						{repository.language && (
							<Tooltip className="flex items-center mr-3 " text={`Written in ${repository.language}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
									/>
								</svg>
								<div className="text-sm ml-1">{repository.language}</div>
							</Tooltip>
						)}
						{repository.stars > 0 && (
							<Tooltip
								className="flex items-center mr-3"
								text={`Starred ${repository.stars} ${repository.stars > 1 ? 'times' : 'time'}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
									/>
								</svg>
								<div className="text-sm ml-1">{repository.stars}</div>
							</Tooltip>
						)}
						{repository.forks > 0 && (
							<Tooltip className="flex items-center mr-3" text={`${repository.forks} forks`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
									/>
								</svg>
								<div className="text-sm ml-1">{repository.forks}</div>
							</Tooltip>
						)}
					</div>
				</Card>
			</Link>
		</article>
	);
};

type AppProps = React.ComponentProps<'div'> & {app: AppType};
const App = ({app, className, ...props}: AppProps) => {
	return (
		<article className={classNames(className)} {...props}>
			<Link rel="noopener noreferrer" href={app.url} target="_blank">
				<Card className="relative group hover:bg-base-200 hover:dark:bg-base-dark-200 hover:shadow-xl transition-all duration-200 h-full">
					<div className="text-2xl font-semibold mb-2">{app.name}</div>
					<div className="flex-grow font-light mb-2 break-words tracking-wide">{app.description}</div>

					<div className="absolute top-2 right-2 text-gray-500 transition-all group-hover:text-gray-800 dark:group-hover:text-white">
						<ArrowTopRightOnSquareIcon className="w-5" />
					</div>
				</Card>
			</Link>
		</article>
	);
};

const Home = async () => {
	const {apps, forks, works} = await getData();

	return (
		<>
			<Navbar />

			<main className="md:h-screen flex flex-col md:flex-row transition">
				<aside className="md:w-[30vw] md:fixed inset-y-0 flex items-center justify-center p-4 mt-16">
					<Profile className="w-full" />
				</aside>
				<div className="md:ml-[30vw] flex flex-col flex-grow">
					<div className="flex-grow p-4 md:pt-20">
						<section className="mb-8">
							<div className="text-3xl mb-4 text-center font-medium md:text-left">Apps</div>
							<div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
								{apps.map((app) => (
									<App key={app.url} app={app} />
								))}
							</div>
						</section>
						<section className="mb-8">
							<div className="text-3xl mb-4 text-center font-medium md:text-left">Repositories</div>
							<div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
								{works.map((repo) => (
									<Repository key={repo.id} repository={repo} className="" />
								))}
							</div>
						</section>
						<section className="mb-8">
							<div className="text-3xl mb-4 text-center font-medium md:text-left">Forks</div>
							<div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
								{forks.map((repo) => (
									<Repository key={repo.id} repository={repo} className="" />
								))}
							</div>
						</section>

						<div className="text-center text-gray-600 dark:text-gray-200 text-sm tracking-wide my-6">
							Made with ❤️ by{' '}
							<Link
								rel="noopener noreferrer"
								href="https://github.com/mauriziocarella"
								target="_blank"
								className="hover:text-primary">
								Maurizio Carella
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

const getData = async () => {
	// Fetch data from external API
	const repos = await fetch(`https://api.github.com/users/mauriziocarella/repos`)
		.then((res) => res.json())
		.then((repos): RepositoryType[] =>
			repos.map((repo: any) => ({
				...repo,
				url: repo.html_url,
				stars: repo.stargazers_count,
				forks: repo.forks_count,
			})),
		);

	const works: RepositoryType[] = repos.filter((repo) => !repo.fork);
	const forks: RepositoryType[] = repos.filter((repo) => repo.fork);

	const apps: AppType[] = await fs
		.readFile(path.join(process.cwd(), 'data/apps.json'), 'utf-8')
		.then((json) => JSON.parse(json));

	// Pass data to the page via props
	return {
		works,
		forks,
		apps,
	};
};

export default Home;
