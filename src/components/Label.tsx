import React, {type ComponentProps} from 'react';
import clsx from '@/lib/clsx';

export type LabelProps = ComponentProps<'label'>;
export const Label = ({className, ...props}: LabelProps) => {
	return (
		<label
			className={clsx(
				'font-medium select-none transition-all',
				className,
			)}
			{...props}
		/>
	);
};
