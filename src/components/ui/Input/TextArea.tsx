import React, {forwardRef, type TextareaHTMLAttributes} from 'react';
import useId from '@/lib/hooks/useId';
import clsx from '@/lib/clsx';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string;
};
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({label, id: _id, className, ...props}, ref) => {
		const id = useId(_id);

		return (
			<div className={className}>
				{label && (
					<label
						htmlFor={id}
						className="block text-sm font-medium text-gray-700 mb-1">
						{label}
					</label>
				)}

				<textarea
					ref={ref}
					id={id}
					className={clsx(
						'block min-h-[2.5rem] min-w-[200px] w-full sm:text-sm p-2 border border-gray-300 shadow-sm rounded-md transition-all outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary',
						className,
					)}
					{...props}
				/>
			</div>
		);
	},
);
TextArea.displayName = 'TextArea';

export default TextArea;
