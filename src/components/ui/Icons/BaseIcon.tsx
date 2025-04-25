import type {ComponentProps} from 'react';

export type BaseIconProps = ComponentProps<'svg'>;
const BaseIcon = ({children, ...props}: BaseIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}>
		{children}
	</svg>
);

export default BaseIcon;
