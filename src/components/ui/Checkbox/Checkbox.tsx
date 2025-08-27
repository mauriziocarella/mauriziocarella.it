import React, {type ComponentProps, forwardRef, type ReactNode} from 'react';
import useId from '@/lib/hooks/useId';
import clsx from '@/lib/clsx';
import {Label} from '@/components/ui/Label/Label';

type CheckboxProps = ComponentProps<'input'> & {
	label?: ReactNode;
};
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({id: _id, className, label, ...props}, ref) => {
		const id = useId(_id);

		return (
			<div className="flex items-center gap-1 w-min group">
				<input
					ref={ref}
					id={id}
					type="checkbox"
					className={clsx(
						'bg-background checked:bg-primary checked:border-primary indeterminate:bg-primary indeterminate:border-primary',
						'appearance-none w-4 h-4 align-middle border rounded cursor-pointer transition-all duration-100 outline-offset-1 outline-primary checked:outline-primary-600',
						'disabled:opacity-60 disabled:cursor-default',
						className,
					)}
					{...props}
				/>
				{label && (
					<Label
						htmlFor={id}
						className="ml-1 align-middle cursor-pointer group-hover:text-primary">
						{label}
					</Label>
				)}
			</div>
		);
	},
);
Checkbox.displayName = 'Checkbox';
