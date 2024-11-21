import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from '@/lib/clsx';
import {Input, type InputProps} from '@/components/Input';
import {setNativeValue} from '@/lib';
import {Label} from '@/components/Label';
import {useEvent} from 'react-use';
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
	const [value, setValue] = useState(_value ?? min);

	const [containerRef, setContainerRef] = useStateRef<HTMLDivElement>();
	const input = useRef<HTMLInputElement>(null);

	const [grabbing, setGrabbing] = useState(false);

	const setFromPosition = useCallback(
		(posX: number) => {
			if (!containerRef) return;

			posX = posX - containerRef.offsetLeft;

			let value = (posX * (max - min)) / containerRef.offsetWidth;

			value = Math.min(Math.max(value, min), max);
			value = value - (value % step);

			if (input.current) setNativeValue(input.current, String(value));
		},
		[containerRef, max, min, step],
	);

	const mousemove = useCallback(
		(e: MouseEvent) => {
			if (grabbing && containerRef && input.current) {
				setFromPosition(e.clientX);
			}
		},
		[containerRef, grabbing, setFromPosition],
	);
	const mouseup = useCallback(() => {
		setGrabbing(false);
	}, []);

	useEvent('mousemove', mousemove);
	useEvent('mouseup', mouseup);

	useEffect(() => {
		if (typeof _value !== 'undefined') setValue(Number(_value));
	}, [_value]);

	const width = useMemo(() => {
		if (!containerRef) return 0;

		const width = (value * containerRef.offsetWidth) / (max - min);

		return Math.min(Math.max(width, 0), containerRef.offsetWidth);
	}, [containerRef, max, min, value]);

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
				onClick={(e) => setFromPosition(e.clientX)}>
				<div className="absolute h-1 inset-x-0 bg-gray-300 dark:bg-gray-700 rounded-full top-1/2 -translate-y-1/2"></div>
				<div
					className="absolute h-1 bg-primary rounded-full top-1/2 -translate-y-1/2"
					style={{width}}
				/>
				<div
					className={clsx(
						'absolute h-4 w-4 bg-white border-2 border-primary shadow-md rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2',
						grabbing ? 'cursor-grabbing' : 'cursor-grab',
					)}
					onMouseDown={() => setGrabbing(true)}
					style={{
						left: width,
					}}
				/>
			</div>
		</div>
	);
};
