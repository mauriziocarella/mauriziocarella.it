'use client';

import {ArrowDownIcon, MailIcon} from 'lucide-react';
import {useCallback, useMemo} from 'react';
import {useWindowScroll, useWindowSize} from 'react-use';
import clsx from '@/lib/clsx';
import {ClientOnly} from '@/components/ui/Client/Client';
import Image from '@/components/ui/Image/Image';
import {Link} from '@/components/ui/Link/Link';
import Icon from '@/components/ui/Icons/Icon';
import GitHubIcon from '@/components/ui/Icons/Brand/GitHubIcon';

const Profile = () => {
	return (
		<div className="flex flex-col gap justify-center items-center text-center h-screen relative">
			<div className="w-48 h-48 mb-4 rounded-full p-8 bg-background-700 hover:scale-105">
				<Image src="/images/logo.png" alt="Logo" priority />
			</div>

			<div className="text-3xl">Maurizio Carella</div>
			<div className="italic">FullStack developer</div>

			<Socials className="mt-2" />

			<ClientOnly>
				<ScrollTo />
			</ClientOnly>
		</div>
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
				icon: GitHubIcon,
			},
			{
				url: 'mailto:info@mauriziocarella.it',
				icon: MailIcon,
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
					target="_blank"
					className="text-inherit">
					<Icon name={social.icon} className="size-6" />
				</Link>
			))}
		</div>
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
