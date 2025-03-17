'use client';

import {ArrowDownIcon} from 'lucide-react';
import {useCallback} from 'react';
import {useWindowScroll, useWindowSize} from 'react-use';
import clsx from '@/lib/clsx';
import {ClientOnly} from '@/components/Client';

const Profile = () => {
	return (
		<div className="flex flex-col gap justify-center items-center h-screen relative">
			<div className="text-3xl">Maurizio Carella</div>
			<div className="italic">FullStack developer</div>

			<ClientOnly>
				<ScrollTo />
			</ClientOnly>
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
