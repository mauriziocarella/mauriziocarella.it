'use client';

import React, {
	type ComponentProps,
	forwardRef,
	type MouseEventHandler,
	useCallback,
	useRef,
} from 'react';
import {
	motion,
	useMotionValue,
	useSpring,
	useMotionTemplate,
} from 'framer-motion';
import clsx from '@/lib/clsx';
import {mergeRefs} from '@/lib';
import type {Extend} from '#/@types';

export type Container3DProps = Extend<
	ComponentProps<typeof motion.div>,
	{
		rotation?: number;
	}
>;
export const Container3D = forwardRef<HTMLDivElement, Container3DProps>(
	function Container3D(
		{
			children,
			className,
			onMouseMove,
			onMouseLeave,
			rotation = 15,
			...props
		},
		ref,
	) {
		const innerRef = useRef<HTMLDivElement>(null);
		const x = useMotionValue(0);
		const y = useMotionValue(0);

		const xSpring = useSpring(x);
		const ySpring = useSpring(y);

		const transform = useMotionTemplate`rotateX(${ySpring}deg) rotateY(${xSpring}deg)`;

		const handleMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
			(e) => {
				if (!innerRef.current) return;
				const rect = innerRef.current.getBoundingClientRect();
				const mouseX = (e.clientX - rect.left) * rotation;
				const mouseY = (e.clientY - rect.top) * rotation;
				x.set(mouseX / rect.width - rotation / 2);
				y.set((mouseY / rect.height - rotation / 2) * -1);
				onMouseMove?.(e);
			},
			[onMouseMove, rotation, x, y],
		);

		const handleMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>(
			(e) => {
				x.set(0);
				y.set(0);
				onMouseLeave?.(e);
			},
			[onMouseLeave, x, y],
		);

		return (
			<motion.div
				{...props}
				ref={mergeRefs(ref, innerRef)}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{
					transformStyle: 'preserve-3d',
					transform,
				}}
				className={clsx(className)}>
				{children}
			</motion.div>
		);
	},
);
