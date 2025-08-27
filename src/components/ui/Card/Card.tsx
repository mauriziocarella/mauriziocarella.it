import {type ElementType, forwardRef} from 'react';
import clsx from '@/lib/clsx';
import type {PolymorphicProps, PolymorphicRef} from '#/@types';

export type CardProps<As extends ElementType> = PolymorphicProps<As>;
export const Card = forwardRef(function Card<As extends ElementType>(
	{as, className, ...props}: CardProps<As>,
	ref: PolymorphicRef<As>,
) {
	const Component = as ?? 'div';
	return (
		<Component
			ref={ref}
			className={clsx(
				'border bg-background-800 rounded-2xl p-6',
				className,
			)}
			{...props}
		/>
	);
});
