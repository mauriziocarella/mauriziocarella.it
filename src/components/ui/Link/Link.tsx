import ReactLink from 'next/link';
import type {ComponentProps} from 'react';
import clsx from '@/lib/clsx';

export type LinkProps = ComponentProps<typeof ReactLink>;
export const Link = ({className, ...props}: LinkProps) => {
	return (
		<ReactLink
			className={clsx(
				'inline-flex items-center gap-2 text-accent hover:underline underline-offset-2 font-medium transition-colors',
				className,
			)}
			{...props}
		/>
	);
};
