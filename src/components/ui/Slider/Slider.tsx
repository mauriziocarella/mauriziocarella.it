'use client';

import React, {
	MouseEvent,
	TouchEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import clsx from '@/lib/clsx';
import {Input, type InputProps} from '@/components/ui/Input/Input';
import {setNativeValue} from '@/lib';
import {Label} from '@/components/ui/Label/Label';
import {useEvent} from 'react-use';
import useIsClient from '@/lib/hooks/useIsClient';
import useStateRef from '@/lib/hooks/useStateRef';

export type SliderProps = InputProps & {
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	value?: number;
};
export const Slider = ({
	label,
	className,
	min = 0,
	max = 100,
	step = 1,
	value: _value,
	...props
}: SliderProps) => {
	const isClient = useIsClient();
	const [value, setValue] = useState(_value ?? min);

	const [containerRef, setContainerRef] = useStateRef<HTMLDivElement>();
	const input = useRef<HTMLInputElement>(null);

	const [grabbing, setGrabbing] = useState(false);

	const setFromPosition = useCallback(
		(clientX: number) => {
			if (!containerRef) return;

			const rect = containerRef.getBoundingClientRect();
			const posX = clientX - rect.x;

			let value = min + (posX / rect.width) * (max - min);

			value = Math.min(Math.max(value, min), max);
			value = value - (value % step);

			if (input.current) setNativeValue(input.current, String(value));
		},
		[containerRef, max, min, step],
	);

	const touchstart = useCallback(
		(e: TouchEvent) => {
			setGrabbing(true);
			setFromPosition(e.touches[0].clientX);
		},
		[setFromPosition],
	);
	const touchmove = useCallback(
		(e: TouchEvent) => {
			if (grabbing) {
				e.preventDefault();
				setFromPosition(e.touches[0].clientX);
			}
		},
		[grabbing, setFromPosition],
	);
	const touchend = useCallback(() => {
		setGrabbing(false);
	}, []);

	const mousedown = useCallback(
		(e: MouseEvent) => {
			setGrabbing(true);
			setFromPosition(e.clientX);
		},
		[setFromPosition],
	);
	const mousemove = useCallback(
		(e: MouseEvent) => {
			if (grabbing) {
				setFromPosition(e.clientX);
			}
		},
		[grabbing, setFromPosition],
	);
	const mouseup = useCallback(() => {
		setGrabbing(false);
	}, []);

	useEvent('touchmove', touchmove, undefined, {
		passive: false,
	});
	useEvent('touchend', touchend);
	useEvent('mousemove', mousemove);
	useEvent('mouseup', mouseup);

	useEffect(() => {
		if (typeof _value !== 'undefined') setValue(Number(_value));
	}, [_value]);

	const percentage = useMemo(() => {
		const percentage = ((value - min) / (max - min)) * 100;

		return Math.min(Math.max(percentage, 0), 100);
	}, [max, min, value]);

	return (
		<div className={className}>
			<div className="flex items-center justify-between space-x-2">
				{label && (
					<Label className="ml-1 align-middle cursor-pointer group-hover:text-primary">
						{label}
					</Label>
				)}
				<Input
					ref={input}
					type="number"
					min={min}
					max={max}
					step={step}
					value={value}
					{...props}
				/>
			</div>
			<div
				ref={setContainerRef}
				className="relative h-6 select-none"
				onMouseDown={mousedown}
				onTouchStart={touchstart}>
				<div className="absolute h-1 inset-x-0 bg-gray-300 dark:bg-gray-700 rounded-full top-1/2 -translate-y-1/2"></div>
				<div
					className="absolute h-1 bg-primary rounded-full top-1/2 -translate-y-1/2"
					style={{
						width: isClient ? `${percentage}%` : 0,
					}}
				/>
				<div
					className={clsx(
						'absolute h-4 w-4 bg-white border-2 border-primary shadow-md rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2',
						grabbing ? 'cursor-grabbing' : 'cursor-grab',
					)}
					onMouseDown={() => setGrabbing(true)}
					style={{
						left: isClient ? `${percentage}%` : 0,
					}}
				/>
			</div>
		</div>
	);
};
