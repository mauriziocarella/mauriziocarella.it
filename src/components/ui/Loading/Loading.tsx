'use client';

import type {ComponentProps} from 'react';
import clsx from '@/lib/clsx';
import {motion} from 'framer-motion';

export type LoadingIconProps = ComponentProps<'svg'>;
export const LoadingIcon = ({className, ...props}: LoadingIconProps) => {
	return (
		<svg
			viewBox="0 0 24 24"
			{...props}
			className={clsx('size-12 text-secondary animate-spin', className)}
			fill="none">
			<path
				d="M12 4a8 8 0 1 1 -8 8"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
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
