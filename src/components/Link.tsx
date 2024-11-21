import ReactLink from 'next/link';
import type {ComponentProps} from 'react';
import clsx from '@/lib/clsx';

export type LinkProps = ComponentProps<typeof ReactLink>;
export const Link = ({className, ...props}: LinkProps) => {
	return (
		<ReactLink
			className={clsx(
				'inline-block text-accent hover:underline font-medium',
				className,
			)}
			{...props}
		/>
	);
};
