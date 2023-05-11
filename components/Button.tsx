'use client';

import React, {useMemo} from 'react';
import {classNames} from '../utils';
import {Tooltip} from './Tooltip';

export type ButtonProps = React.ComponentProps<'button'> & {
	icon?: React.ElementType;
	square?: boolean;
	tooltip?: string;
};
export const Button = ({className, square, icon: Icon, children, tooltip, ...props}: ButtonProps) => {
	const sizeClasses = useMemo(() => {
		if (square) {
			return 'w-12 h-12 p-0';
		}

		return 'h-12';
	}, [square]);

	return (
		<Tooltip text={tooltip}>
			<button
				type="button"
				className={classNames(
					'flex items-center justify-center min-h-[1rem] rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-800 hover:shadow-lg px-4 py-2 transition-all',
					tooltip && 'relative tooltip',
					sizeClasses,
					className,
				)}
				{...props}
				data-tip={tooltip}>
				{Icon && <Icon className="w-6 h-6" />}

				{children}
			</button>
		</Tooltip>
	);
};

export type IconButtonProps = Omit<ButtonProps, 'square'>;
export const IconButton = ({...props}: IconButtonProps) => {
	return <Button {...props} square />;
};
