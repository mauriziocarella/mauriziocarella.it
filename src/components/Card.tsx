import type {ComponentProps} from 'react';
import clsx from '@/lib/clsx';

export type CardProps = ComponentProps<'div'>;
export const Card = ({className, ...props}: CardProps) => {
	return (
		<div className={clsx('border rounded-lg p-6', className)} {...props} />
	);
};
