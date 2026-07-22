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
	useMotionTemplate,
	useMotionValue,
	useReducedMotion,
	useSpring,
} from 'framer-motion';
import clsx from '@/lib/clsx';
import {mergeRefs} from '@/lib';
import type {Extend} from '#/@types';

export type Container3DProps = Extend<
	ComponentProps<typeof motion.div>,
	{
		lift?: number;
		perspective?: number;
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
			onMouseEnter,
			style,
			lift = 8,
			perspective = 900,
			rotation = 10,
			...props
		},
		ref,
	) {
		const innerRef = useRef<HTMLDivElement>(null);
		const prefersReducedMotion = useReducedMotion();
		const x = useMotionValue(0);
		const y = useMotionValue(0);
		const liftY = useMotionValue(0);
		const scale = useMotionValue(1);
		const shadowOpacity = useMotionValue(0);

		const spring = {stiffness: 220, damping: 24, mass: 0.4};
		const xSpring = useSpring(x, spring);
		const ySpring = useSpring(y, spring);
		const liftYSpring = useSpring(liftY, spring);
		const scaleSpring = useSpring(scale, spring);
		const shadowOpacitySpring = useSpring(shadowOpacity, spring);

		const transform = useMotionTemplate`perspective(${perspective}px) translateY(${liftYSpring}px) rotateX(${ySpring}deg) rotateY(${xSpring}deg) scale(${scaleSpring})`;
		const boxShadow = useMotionTemplate`0 ${shadowOpacitySpring}px ${shadowOpacitySpring}px rgb(0 0 0 / 0.18)`;

		const handleMouseMove = useCallback<MouseEventHandler<HTMLDivElement>>(
			(e) => {
				if (!innerRef.current) return;
				const rect = innerRef.current.getBoundingClientRect();
				const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
				const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

				if (!prefersReducedMotion) {
					x.set(mouseX * rotation);
					y.set(mouseY * rotation * -1);
					liftY.set(-lift);
					shadowOpacity.set(lift);
				}

				onMouseMove?.(e);
			},
			[
				lift,
				liftY,
				onMouseMove,
				prefersReducedMotion,
				rotation,
				shadowOpacity,
				x,
				y,
			],
		);

		const handleMouseEnter = useCallback<MouseEventHandler<HTMLDivElement>>(
			(e) => {
				if (!prefersReducedMotion) {
					liftY.set(-lift);
					scale.set(1.018);
					shadowOpacity.set(lift);
				}

				onMouseEnter?.(e);
			},
			[
				lift,
				liftY,
				onMouseEnter,
				prefersReducedMotion,
				scale,
				shadowOpacity,
			],
		);

		const handleMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>(
			(e) => {
				x.set(0);
				y.set(0);
				liftY.set(0);
				scale.set(1);
				shadowOpacity.set(0);
				onMouseLeave?.(e);
			},
			[liftY, onMouseLeave, scale, shadowOpacity, x, y],
		);

		return (
			<motion.div
				{...props}
				ref={mergeRefs(ref, innerRef)}
				onMouseEnter={handleMouseEnter}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{
					...style,
					boxShadow,
					transformStyle: 'preserve-3d',
					transform,
					willChange: 'transform',
				}}
				className={clsx(className)}>
				{children}
			</motion.div>
		);
	},
);
