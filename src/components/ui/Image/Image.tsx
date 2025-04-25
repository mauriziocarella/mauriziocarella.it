'use client';

import NextImage from 'next/image';
import clsx from '@/lib/clsx';
import {type ComponentProps, type ComponentPropsWithoutRef} from 'react';
import type {Extend} from '#/@types';

export type ImageProps = Extend<
	ComponentPropsWithoutRef<typeof NextImage>,
	{
		src: ComponentProps<typeof NextImage>['src'] | undefined | null;
		fit?: 'cover' | 'contain';
		imgClassName?: string;
	}
>;
const Image = ({
	src,
	className,
	imgClassName,
	fit = 'contain',
	...props
}: ImageProps) => {
	if (!src) return null;

	return (
		<div
			className={clsx(
				'relative w-full h-full flex-shrink-0 overflow-hidden',
				className,
			)}>
			<NextImage
				fill
				{...props}
				src={src}
				className={clsx(
					fit === 'cover' && 'object-cover',
					fit === 'contain' && 'object-contain',
					imgClassName,
				)}
			/>
		</div>
	);
};

export default Image;
