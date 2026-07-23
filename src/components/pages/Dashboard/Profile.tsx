'use client';

import {ArrowDownIcon, MailIcon} from 'lucide-react';
import {type MouseEvent, useCallback, useMemo} from 'react';
import {useWindowScroll, useWindowSize} from 'react-use';
import clsx from '@/lib/clsx';
import {ClientOnly} from '@/components/ui/Client/Client';
import Image from '@/components/ui/Image/Image';
import {Link} from '@/components/ui/Link/Link';
import Icon from '@/components/ui/Icons/Icon';
import GitHubIcon from '@/components/ui/Icons/Brand/GitHubIcon';
import {Container3D} from '@/components/ui/Containers/Container3D';
import {SpotlightCard} from '@/components/ui/Card/SpotlightCard';
import Background from './Background';

const Profile = () => {
	return (
		<Background
			containerClassName="h-screen"
			className="flex flex-col gap justify-center items-center text-center p-2">
			<SpotlightCard
				as={Container3D}
				containerClassName="px-8 py-6 backdrop-blur-[2px] bg-background/10"
				className="flex flex-col gap-4 justify-center items-center text-center"
				rotation={20}>
				<div className="w-full aspect-square max-w-32 mb-4 rounded-full">
					<Image
						src="/images/logo.png"
						alt="Logo"
						preload
						fetchPriority="high"
						sizes="128px"
					/>
				</div>

				<div className="text-3xl">Maurizio Carella</div>
				<div className="italic">FullStack developer</div>

				<Socials className="mt-2" />
			</SpotlightCard>

			<ClientOnly>
				<ScrollTo />
			</ClientOnly>
		</Background>
	);
};

type SocialsProps = {
	className?: string;
};
const Socials = ({className}: SocialsProps) => {
	const socials = useMemo(
		() => [
			{
				url: 'https://github.com/mauriziocarella',
				title: 'GitHub Profile',
				icon: GitHubIcon,
			},
		],
		[],
	);

	return (
		<div
			className={clsx(
				'flex justify-center items-center gap-2',
				className,
			)}>
			{socials.map((social) => (
				<Link
					key={social.url}
					href={social.url}
					title={social.title}
					target="_blank"
					className="text-inherit hover:text-accent">
					<Icon name={social.icon} className="size-6" />
				</Link>
			))}
			<EmailSocial />
		</div>
	);
};

const EmailSocial = () => {
	const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		const user = 'info';
		const domain = 'mauriziocarella.it';
		window.location.href = `mailto:${user}@${domain}`;
	}, []);

	return (
		<a
			href="#email"
			title="Email"
			aria-label="Email"
			onClick={handleClick}
			className="inline-flex items-center w-fit gap-2 hover:underline underline-offset-2 font-medium transition-colors text-inherit hover:text-accent">
			<Icon name={MailIcon} className="size-6" />
		</a>
	);
};

const ScrollTo = () => {
	const {height} = useWindowSize();
	const {y} = useWindowScroll();

	const handleScroll = useCallback(() => {
		window.scrollTo({
			top: window.innerHeight,
			left: 0,
			behavior: 'smooth',
		});
	}, []);

	return (
		<div
			className={clsx(
				'absolute bottom-2 inset-x-auto opacity-0 transition-opacity',
				y <= height * 0.1 && 'opacity-100',
			)}>
			<button
				type="button"
				className="p cursor-pointer"
				onClick={handleScroll}
				aria-label="Scroll to bottom">
				<ArrowDownIcon className="animate-bounce" />
			</button>
		</div>
	);
};

export default Profile;
