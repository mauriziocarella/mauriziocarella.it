import {type ComponentProps, useMemo} from 'react';
import clsx from '@/lib/clsx';

const colors = {
	primary:
		'bg-primary dark:bg-primary text-white dark:text-white border-primary-600 focus-within:border-primary-600 ring-primary-600',
	success:
		'bg-success dark:bg-success text-white dark:text-white border-success-600 focus-within:border-success-600 ring-success-600',
} as const;

export type ButtonProps = ComponentProps<'button'> & {
	color?: keyof typeof colors;
};
export const Button = ({className, color, ...props}: ButtonProps) => {
	const colorClasses = useMemo(() => (color ? colors[color] : ''), [color]);

	return (
		<button
			type="button"
			{...props}
			className={clsx(
				'flex items-center justify-center gap-2 transition-colors rounded-lg px-4 py-2 outline-none cursor-pointer',
				'focus-within:ring-1 ring-primary',
				'border focus-within:border-primary',
				'bg-background text-foreground',
				'[&>svg]:w-5 [&>svg]:h-5',
				colorClasses,
				className,
			)}
		/>
	);
};

export type IconButtonProps = ButtonProps;
export const IconButton = ({className, ...props}: IconButtonProps) => {
	return <Button className={clsx('p-2 w-10 h-10', className)} {...props} />;
};
