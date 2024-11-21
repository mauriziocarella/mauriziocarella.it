import React, {
	type ComponentProps,
	type ElementType,
	type PropsWithChildren,
	ReactNode,
} from 'react';
import clsx from '@/lib/clsx';

export type TooltipProps<Element extends ElementType> = PropsWithChildren<
	ComponentProps<Element> & {
		content: ReactNode;
		as: Element;
	}
>;

export const Tooltip = <Element extends ElementType>({
	as: Element = 'div',
	content,
	className,
	children,
	...props
}: TooltipProps<Element>) => {
	return (
		<Element className={clsx('group relative', className)} {...props}>
			{children}
			<div className="absolute z-tooltip bg-stone-800 text-white text-sm py-1 px-2 rounded shadow-lg top-0 left-1/2 opacity-0 -translate-x-1/2 translate-y-0 transition-all group-hocus:opacity-100 group-hocus:-translate-y-full">
				{content}
			</div>
		</Element>
	);
};
