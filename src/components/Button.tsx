import {type ComponentProps, useMemo} from 'react';
import clsx from '@/lib/clsx';

export type ButtonProps = ComponentProps<'button'> & {
	color?: 'primary' | 'success' | 'default';
};
export const Button = ({className, color, ...props}: ButtonProps) => {
	const colorClasses = useMemo(() => {
		switch (color) {
			case 'primary':
				return 'bg-primary dark:bg-primary';
			case 'success':
				return 'bg-success dark:bg-success';
		}
	}, [color]);

	return (
		<button
			type="button"
			className={clsx(
				'flex items-center justify-center gap-2 transition-colors rounded-lg px-4 py-2 outline-none',
				'focus-within:ring-1 ring-primary',
				'border focus-within:border-primary',
				'bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark',
				'[&>svg]:w-5 [&>svg]:h-5',
				colorClasses,
				className,
			)}
			{...props}
		/>
	);
};

export type IconButtonProps = ButtonProps;
export const IconButton = ({className, ...props}: IconButtonProps) => {
	return <Button className={clsx('p-2 w-10 h-10', className)} {...props} />;
};
