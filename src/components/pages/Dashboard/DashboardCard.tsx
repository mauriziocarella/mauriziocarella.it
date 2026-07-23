import type {HTMLAttributes} from 'react';
import clsx from '@/lib/clsx';

type DashboardCardProps = HTMLAttributes<HTMLDivElement> & {
	contentClassName?: string;
};

export const DashboardCard = ({
	children,
	className,
	contentClassName,
	style,
	...props
}: DashboardCardProps) => (
	<div
		{...props}
		style={{...style, transformStyle: 'preserve-3d'}}
		className={clsx(
			'group/card border bg-background-800 rounded-2xl p-6 relative overflow-hidden transition-[transform,box-shadow,border-color] duration-500 ease-out transform-gpu motion-safe:hover:[transform:perspective(900px)_translateY(-8px)_rotateX(4deg)_rotateY(-5deg)_scale(1.018)] hover:shadow-lg',
			className,
		)}>
		<div
			className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover/card:opacity-100"
			style={{
				background:
					'radial-gradient(circle at 50% 0%, var(--color-spotlight), transparent 58%)',
				transform: 'translateZ(18px)',
			}}
		/>
		<div
			className={clsx('relative h-full', contentClassName)}
			style={{transform: 'translateZ(28px)'}}>
			{children}
		</div>
	</div>
);
