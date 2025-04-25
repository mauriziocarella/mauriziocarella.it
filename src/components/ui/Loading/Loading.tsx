'use client';

import type {ComponentProps} from 'react';
import clsx from '@/lib/clsx';
import {motion} from 'framer-motion';

export type LoadingIconProps = ComponentProps<'div'>;
export const LoadingIcon = ({className, ...props}: LoadingIconProps) => {
	return (
		<div
			className={clsx(
				'w-12 h-12 border-2 border-stone-900 dark:border-white border-b-transparent dark:border-b-transparent rounded-full animate-[rotation_1s_linear_infinite]',
				className,
			)}
			{...props}
		/>
	);
};

export type LoadingOverlayProps = ComponentProps<typeof motion.div> & {
	delay?: number;
	duration?: number;
};
export const LoadingOverlay = ({
	className,
	delay = 0,
	duration = 0.5,
	...props
}: LoadingOverlayProps) => (
	<>
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{delay, duration}}
			{...props}
			className={clsx(
				'absolute inset-0 flex justify-center items-center bg-background/80',
				className,
			)}>
			<LoadingIcon />
		</motion.div>
	</>
);
