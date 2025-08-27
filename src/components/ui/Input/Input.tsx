import React, {
	cloneElement,
	type ComponentProps,
	forwardRef,
	type ReactElement,
	type ReactNode,
	useEffect,
	useMemo,
	useState,
} from 'react';
import clsx from '@/lib/clsx';
import useId from '@/lib/hooks/useId';
import {EyeIcon, EyeOffIcon, type LucideProps, XIcon} from 'lucide-react';
import {mergeRefs} from '@/lib';
import {Label} from '@/components/ui/Label/Label';
import useStateRef from '@/lib/hooks/useStateRef';
import type {Extend} from '#/@types';

export type InputProps = Extend<
	ComponentProps<'input'>,
	{
		label?: string;
		invalid?: boolean | string;
		isClearable?: boolean;
		icon?: ReactElement<Pick<LucideProps, 'className' | 'onClick'>>;
		LeftComponent?: ReactNode;
		RightComponent?: ReactNode;
		ActionComponent?: ReactNode;
		inputProps?: ComponentProps<'input'>;
	}
>;
export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			id: _id,
			className,
			isClearable,
			LeftComponent: _LeftComponent,
			RightComponent: _RightComponent,
			ActionComponent,
			icon,
			type: _type,
			...props
		},
		ref,
	) => {
		const id = useId(_id);
		const [innerRef, setInnerRef] = useStateRef<HTMLInputElement>();
		const [type, setType] = useState(_type || 'text');

		useEffect(() => {
			setType(_type || 'text');
		}, [_type]);

		const clear = () => {
			Object.getOwnPropertyDescriptor(
				window.HTMLInputElement.prototype,
				'value',
			)?.set?.call(innerRef, '');

			innerRef?.dispatchEvent(new Event('change', {bubbles: true}));
		};

		const LeftComponent = useMemo(() => {
			if (_LeftComponent) return _LeftComponent;

			return null;
		}, [_LeftComponent]);
		const RightComponent = useMemo(() => {
			if (icon)
				return cloneElement(icon, {
					className: 'w-5 h-5',
					onClick: () => innerRef?.focus(),
				});
			if (_RightComponent) return _RightComponent;

			return null;
		}, [icon, _RightComponent, innerRef]);

		return (
			<div className={clsx('', className)}>
				{label && (
					<Label htmlFor={id} className="cursor-pointer mb-1">
						{label}
					</Label>
				)}

				<div className="flex flex-col xs:flex-row xs:items-center gap-2">
					<div
						className={clsx(
							'group relative flex items-stretch min-w-[200px] min-h-[2.5rem] w-full sm:text-sm rounded-md overflow-hidden transition-all duration-100',
							'bg-background',
							// 'focus-within:outline outline-primary outline-offset-2',
							'focus-within:ring-1 ring-primary',
							'border focus-within:border-primary',
							props.disabled && '[&>input]:opacity-80',
							props.readOnly && '[&>input]:opacity-80',
							props.invalid &&
								'border-error-500 focus-within:border-error-500 focus-within:ring-error-500',
						)}>
						{LeftComponent && (
							<div className="flex items-center text-gray-300 transition-colors sm:text-sm group-focus-within:text-gray-500 px-2 -mr-2">
								{LeftComponent}
							</div>
						)}
						<input
							ref={mergeRefs(setInnerRef, ref)}
							id={id}
							autoComplete="off"
							{...props}
							{...props.inputProps}
							className={clsx(
								'w-full block flex-grow focus-visible:ring-0 focus-visible:shadow-none focus-visible:outline-none bg-transparent px-2',
								props.disabled &&
									'text-gray-600 pointer-events-none',
								props.inputProps?.className,
							)}
							type={type}
						/>
						{isClearable && (
							<div className="flex items-center text-gray-300 transition-colors sm:text-sm group-focus-within:text-gray-500">
								<div
									className={clsx(
										'cursor-pointer transition-all hover:text-gray-600 p-2',
									)}
									onClick={clear}>
									<XIcon className="w-4 h-4" />
								</div>
							</div>
						)}
						{(RightComponent || _type === 'password') && (
							<div className="flex items-center text-gray-300 space-x-2 transition-colors sm:text-sm group-focus-within:text-gray-500 px-2">
								{RightComponent}

								{_type === 'password' && (
									<>
										{type === 'password' ? (
											<EyeIcon
												className="w-5 h-5 cursor-pointer"
												onClick={() => setType('text')}
											/>
										) : (
											<EyeOffIcon
												className="w-5 h-5 cursor-pointer"
												onClick={() =>
													setType('password')
												}
											/>
										)}
									</>
								)}
							</div>
						)}
					</div>
					{ActionComponent}
				</div>

				{props.invalid && typeof props.invalid === 'string' && (
					<div className="text-xs text-error mt-0.5 font-medium">
						{props.invalid}
					</div>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';
