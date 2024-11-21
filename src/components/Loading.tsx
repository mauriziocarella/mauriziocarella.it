import type {ComponentProps} from 'react';
import clsx from '@/lib/clsx';

export type LoadingIconProps = ComponentProps<'div'>;
export const LoadingIcon = ({className, ...props}: LoadingIconProps) => {
	return (
		<div
			className={clsx(
				'w-12 h-12 border-2 border-stone-900 dark:border-white border-b-transparent dark:border-b-transparent rounded-full animate-[rotation_1s_linear_infinite]',
				className,
			)}
			{...props}
		/>
	);
};
