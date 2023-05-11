import React from 'react';
import classNames from 'classnames';

export type CardProps = React.ComponentProps<'div'>;

export const Card = ({className, children, ...props}: CardProps) => {
	return (
		<div
			className={classNames(
				'card p-8 flex flex-col gap-2 bg-neutral-100 dark:bg-neutral-900 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 rounded-lg shadow',
				className,
			)}
			{...props}>
			{children}
		</div>
	);
};
