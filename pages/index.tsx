import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {GetServerSideProps, NextPage} from 'next';
import axios from 'axios';
import {
	FaDiscord,
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaTelegram,
	FaTwitter,
	FaWhatsapp,
} from 'react-icons/fa';

import {RepositoryType} from '../types/Repository';

import imgProfile from '../public/images/profile.png';

import {useDarkMode} from '../utils/hooks';
import Scrollbar from '../components/Scrollbar';
import {ExternalLinkIcon, LightBulbIcon} from '@heroicons/react/outline';

const socials = [
	{
		label: 'Facebook',
		icon: <FaFacebook />,
		link: 'https://www.facebook.com/maurizio.carella.16/',
	},
	{
		label: 'Github',
		icon: <FaGithub />,
		link: 'https://github.com/mauriziocarella/',
	},
	{
		label: 'Instagram',
		icon: <FaInstagram />,
		link: 'https://www.instagram.com/mauriziocarella/',
	},
	{
		label: 'Linkedin',
		icon: <FaLinkedin />,
		link: 'https://www.linkedin.com/in/mauriziocarella/',
	},
	{
		label: 'Telegram',
		icon: <FaTelegram />,
		link: 'https://t.me/mauriziocarella',
	},
	{
		label: 'Twitter',
		icon: <FaTwitter />,
		link: 'https://twitter.com/mauri_carella',
	},
	{
		label: 'Whatsapp',
		icon: <FaWhatsapp />,
		link: 'https://api.whatsapp.com/send?phone=00393428885573',
	},
	{
		label: 'Discord',
		icon: <FaDiscord />,
		link: 'https://discordapp.com/users/800654099157745714/',
	},
];

type SocialProps = {social: typeof socials[number]};
const Social = ({social}: SocialProps) => (
	<a
		rel="noopener noreferrer"
		href={social.link}
		className="tooltip p-2"
		target="_blank"
		aria-label={social.label}
		data-tip={social.label}>
		{social.icon}
	</a>
);

type ProfileProps = React.ComponentProps<'div'>;
const Profile = ({className, ...props}: ProfileProps) => {
	return (
		<div className={classNames('text-center px-2', className)} {...props}>
			<div className="text-4xl my-3 font-medium">About me</div>
			<div className="mx-auto rounded-full overflow-hidden shadow-xl" style={{maxWidth: 200}}>
				<Image src={imgProfile} alt="Profile picture" layout="responsive" className="rounded-full overflow-hidden" />
			</div>

			<div className="px-2 my-4">
				<div className="text-2xl mb-4 font-medium">Maurizio Carella</div>
				<div className="text-lg">
					Ciao! I am a 5 years experienced full stack developer skilled in React, NodeJS, Laravel, PHP, MySQL, MongoDB.
					I am actually full-time employed as project manager/web developer at{' '}
					<a target="_blank" rel="noopener noreferrer" href="https://meway.it">
						@Meway SRL
					</a>
				</div>
			</div>

			<div className="text-center flex flex-wrap justify-center items-center text-2xl">
				{socials.map((social, index) => (
					<Social key={`social-${index}`} social={social} />
				))}
			</div>
		</div>
	);
};

type RepositoryProps = React.ComponentProps<'div'> & {repository: RepositoryType};
const Repository = ({repository, className, ...props}: RepositoryProps) => {
	return (
		<article className={classNames(className)} {...props}>
			<a
				rel="noopener noreferrer"
				href={repository.url}
				target="_blank"
				className="card bg-base-200 hover:bg-base-100 rounded-lg shadow hover:shadow-xl transition-all duration-200 h-full">
				<div className="card-body flex flex-col">
					<div className="text-2xl font-semibold mb-2">{repository.name}</div>
					<div className="flex-grow font-light mb-2 break-words tracking-wide">{repository.description}</div>
					<div className="flex flex-wrap items-center py-2">
						<div
							className="flex items-center mr-3 tooltip"
							data-tip={`Last update:\n${new Date(repository.updated_at).toLocaleDateString()} ${new Date(
								repository.updated_at,
							).toLocaleTimeString()}`}>
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
							<div className="text-sm ml-1">{new Date(repository.updated_at).toLocaleDateString()}</div>
						</div>
						{repository.language && (
							<div className="flex items-center mr-3 tooltip" data-tip={`Written in ${repository.language}`}>
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
							</div>
						)}
						{repository.stars > 0 && (
							<div className="flex items-center mr-3 tooltip" data-tip={`${repository.stars} stars`}>
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
							</div>
						)}
						{repository.forks > 0 && (
							<div className="flex items-center mr-3 tooltip" data-tip={`${repository.forks} forks`}>
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
							</div>
						)}
					</div>
				</div>
			</a>
		</article>
	);
};

type AppProps = React.ComponentProps<'div'> & {app: AppType};
const App = ({app, className, ...props}: AppProps) => {
	return (
		<article className={classNames(className)} {...props}>
			<a
				rel="noopener noreferrer"
				href={app.url}
				target="_blank"
				className="group card bg-base-200 hover:bg-base-100 rounded-lg shadow hover:shadow-xl transition-all duration-200 h-full">
				<div className="card-body flex flex-col">
					<div className="text-2xl font-semibold mb-2">{app.name}</div>
					<div className="flex-grow font-light mb-2 break-words tracking-wide">{app.description}</div>

					<div className="absolute top-2 right-2 text-gray-600 transition-colors group-hover:text-white">
						<ExternalLinkIcon className="w-5" />
					</div>
				</div>
			</a>
		</article>
	);
};

type AppType = {
	name: string;
	description: string;
	url: string;
};

type HomeProps = {
	works: RepositoryType[];
	forks: RepositoryType[];
	apps: AppType[];
};
const Home: NextPage<HomeProps> = ({works, forks, apps}) => {
	const [, setDarkMode] = useDarkMode();

	return (
		<>
			<div className="p-2 flex items-center fixed top-0 inset-x-0 w-full z-10 shadow backdrop-blur-md h-16">
				<div className="flex-grow" />
				<div className="tooltip tooltip-bottom tooltip-left" data-tip="Click to toggle theme">
					<button type="button" className="btn btn-ghost" onClick={() => setDarkMode()} aria-label="Toggle theme">
						<LightBulbIcon className="w-6 h-6" />
					</button>
				</div>
			</div>

			<main className="md:h-screen flex flex-col md:flex-row transition">
				<aside className="md:w-1/3 flex items-center justify-center p-4 mt-16">
					<Profile className="w-full" />
				</aside>
				<div className="flex-1 flex flex-col flex-grow">
					<Scrollbar className="scrollbar-navbar flex-grow md:overflow-y-auto p-4 md:pt-20">
						<section className="mb-4">
							<div className="text-3xl mb-4 text-center font-medium md:text-left">Apps</div>
							<div className="grid gap-4 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
								{apps.map((app) => (
									<App key={app.url} app={app} />
								))}
							</div>
						</section>
						<section className="mb-4">
							<div className="text-3xl mb-4 text-center font-medium md:text-left">Repositories</div>
							<div className="grid gap-4 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
								{works.map((repo) => (
									<Repository key={repo.id} repository={repo} className="" />
								))}
							</div>
						</section>
						<section className="mb-4">
							<div className="text-3xl mb-4 text-center font-medium md:text-left">Forks</div>
							<div className="grid gap-4 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
								{forks.map((repo) => (
									<Repository key={repo.id} repository={repo} className="" />
								))}
							</div>
						</section>

						<div className="text-center text-gray-500 text-sm tracking-wide my-6">
							Made with ❤️ by{' '}
							<a
								rel="noopener noreferrer"
								href="https://github.com/mauriziocarella"
								target="_blank"
								className="transition-colors">
								Maurizio Carella
							</a>
						</div>
					</Scrollbar>
				</div>
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	// Fetch data from external API
	const repos = await axios
		.get(`https://api.github.com/users/mauriziocarella/repos`)
		.then((res) => res.data)
		.then((repos): RepositoryType[] =>
			repos.map((repo: any) => ({
				...repo,
				url: repo.html_url,
				stars: repo.stargazers_count,
				forks: repo.forks_count,
			})),
		);

	const works = repos.filter((repo) => !repo.fork);
	const forks = repos.filter((repo) => repo.fork);

	const apps = require('../data/apps');

	// Pass data to the page via props
	return {
		props: {
			works,
			forks,
			apps,
		},
	};
};

export default Home;
