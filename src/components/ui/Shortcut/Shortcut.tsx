import React from 'react';
import clsx from '@/lib/clsx';

export type KeyboardShortcutProps = React.ComponentProps<'kbd'>;
export const KeyboardShortcut = ({
	className,
	...props
}: KeyboardShortcutProps) => {
	return (
		<kbd
			className={clsx(
				'px-1 py-0.5 font-mono bg-gray-800 text-white rounded-md shadow-md border border-gray-700 text-xs',
				className,
			)}
			{...props}
		/>
	);
};
