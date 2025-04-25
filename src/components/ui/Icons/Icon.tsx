import type {ComponentType, PropsWithChildren} from 'react';
import type {LucideProps} from 'lucide-react';
import clsx from '@/lib/clsx';

export type IconProps = PropsWithChildren<{
	name: ComponentType<LucideProps>;
	className?: string;
}>;
const Icon = ({name, className, children}: IconProps) => {
	const Component = name;

	const icon = (
		<Component className={clsx('inline align-middle size-4', className)} />
	);

	if (typeof children !== 'undefined') {
		return (
			<div className="inline-flex items-center gap-1">
				{icon} {children}
			</div>
		);
	}

	return icon;
};

export default Icon;
