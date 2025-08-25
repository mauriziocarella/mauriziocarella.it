'use client';

import React, {
	type ElementType,
	type MouseEventHandler,
	type PropsWithChildren,
	useCallback,
	useRef,
	useState,
} from 'react';
import clsx from '@/lib/clsx';
import type {PolymorphicProps} from '#/@types';

type Position = {
	x: number;
	y: number;
};

export type SpotlightCardProps<As extends ElementType> = PolymorphicProps<
	As,
	PropsWithChildren<{
		className?: string;
		containerClassName?: string;
	}>
>;
export const SpotlightCard = <As extends ElementType = 'div'>({
	as,
	children,
	className,
	containerClassName,
	...props
}: SpotlightCardProps<As>) => {
	const Component = as ?? 'div';
	const divRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({x: 0, y: 0});
	const [opacity, setOpacity] = useState<number>(0);

	const handleMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
		(e) => {
			if (!divRef.current || isFocused) return;

			const rect = divRef.current.getBoundingClientRect();
			setPosition({x: e.clientX - rect.left, y: e.clientY - rect.top});
		},
		[isFocused],
	);

	const handleFocus = useCallback(() => {
		setIsFocused(true);
		setOpacity(0.6);
	}, []);

	const handleBlur = useCallback(() => {
		setIsFocused(false);
		setOpacity(0);
	}, []);

	const handleMouseEnter = useCallback(() => {
		setOpacity(0.6);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setOpacity(0);
	}, []);

	return (
		<Component
			{...props}
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={clsx(
				'relative border bg-background-800 rounded-2xl overflow-hidden p-6',
				containerClassName,
			)}>
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out z-0"
				style={{
					opacity,
					background: `radial-gradient(circle at ${position.x}px ${position.y}px, var(--color-spotlight), transparent 80%)`,
				}}
			/>
			<div className={clsx('relative h-full', className)}>{children}</div>
		</Component>
	);
};
