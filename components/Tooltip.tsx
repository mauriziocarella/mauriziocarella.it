'use client';

import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {usePopper} from 'react-popper';
import {Placement} from '@popperjs/core';
import {classNames} from '../utils';
import {Transition} from '@headlessui/react';
// @ts-ignore
import {createPortal} from 'react-dom';

export type TooltipProps = React.ComponentProps<'div'> & {
	color?: 'default' | 'error' | 'warning' | 'neutral';
	text?: React.ReactNode;
	visible?: boolean;
	placement?: Placement;
	arrow?: boolean;
};

export const Tooltip = ({
	className,
	text,
	color,
	children,
	visible: _visible,
	arrow = true,
	...props
}: TooltipProps) => {
	const [referenceElement, setReferenceElement] = useState<HTMLSpanElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
	const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
	const {styles, attributes, state, ...popper} = usePopper(referenceElement, popperElement, {
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 8],
				},
			},
			{
				name: 'arrow',
				options: {element: arrowElement},
			},
			{
				name: 'preventOverflow',
				options: {
					padding: 8,
				},
				// enabled: false,
			},
		],
		strategy: 'absolute',
		placement: props.placement || 'top',
	});
	const [visible, setVisible] = useState(_visible);

	useEffect(() => {
		setVisible(_visible);
	}, [_visible]);

	const update = useCallback(() => {
		if (typeof popper.update === 'function') popper.update().catch((err) => console.error(err));
	}, [popper.update]);

	useEffect(() => {
		const mouseover = () => setVisible(true);
		const mouseleave = () => setVisible(_visible ?? false);
		const touchstart = () => setVisible((visible) => _visible ?? !visible);

		referenceElement?.addEventListener('mouseover', mouseover, {passive: true});
		referenceElement?.addEventListener('mouseleave', mouseleave, {passive: true});
		referenceElement?.addEventListener('touchstart', touchstart, {passive: true});
		referenceElement?.addEventListener('resize', update, {passive: true});
		if (typeof window !== 'undefined') window.addEventListener('resize', update, {passive: true});

		let resizeObserver: ResizeObserver;
		try {
			resizeObserver = new ResizeObserver(update);

			if (referenceElement) resizeObserver.observe(referenceElement);
		} catch (e) {
			console.error(e);
		}

		return () => {
			referenceElement?.removeEventListener('mouseover', mouseover);
			referenceElement?.removeEventListener('mouseleave', mouseleave);
			referenceElement?.removeEventListener('touchstart', touchstart);
			referenceElement?.removeEventListener('resize', update);
			if (typeof window !== 'undefined') window.removeEventListener('resize', update);

			if (referenceElement) {
				resizeObserver?.unobserve(referenceElement);
			}
		};
	}, [_visible, referenceElement, text, update]);

	useLayoutEffect(() => {
		update();
	}, [children, text, update]);

	const popupColor = useMemo(() => {
		switch (color) {
			default:
				return 'bg-neutral-900 text-neutral-content-dark border-neutral-200 dark:border-neutral-800';
		}
	}, [color]);
	const arrowColor = useMemo(() => {
		switch (color) {
			default:
				return 'border-neutral-200 dark:border-neutral-800 after:border-neutral-900';
		}
	}, [color]);
	const content = useMemo(() => {
		if (!React.isValidElement(children)) {
			return (
				<span ref={setReferenceElement} className={className}>
					{children}
				</span>
			);
		} else {
			return React.cloneElement(children, {
				// @ts-ignore
				ref: setReferenceElement,
			});
		}
	}, [children, className]);

	if (!text || !children) return <>{children}</>;

	return (
		<>
			<TooltipPortal>
				<Transition
					show={Boolean(visible)}
					className="transition-all duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div
						ref={setPopperElement}
						style={styles.popper}
						{...attributes.popper}
						className={classNames(
							'inline-block border rounded p-2 shadow-sm text-xs text-center max-w-[200px] transition-opacity pointer-events-none z-[99999] select-none font-medium whitespace-pre-line',
							popupColor,
						)}>
						{text}
						{arrow && (
							<div
								ref={setArrowElement}
								style={styles.arrow}
								className={classNames(
									'absolute mx-auto w-0 h-0 border-solid border-[4px] after:absolute after:content-[""] after:border-[3px]',
									arrowColor,
									{
										'-bottom-1 border-b-0 border-b-transparent border-x-transparent after:left-[-3px] after:top-[-4px] after:border-b-0 after:border-b-transparent after:border-x-transparent':
											state?.placement === 'top',
										'-top-1 border-t-0 border-t-transparent border-x-transparent after:left-[-3px] after:top-[1px] after:border-t-0 after:border-t-transparent after:border-x-transparent':
											state?.placement === 'bottom',
										'-left-1 border-l-0 border-l-transparent border-y-transparent after:right-[-4px] after:top-[-3px] after:border-l-0 after:border-l-transparent after:border-y-transparent':
											state?.placement === 'right',
										'-right-1 border-r-0 border-r-transparent border-y-transparent after:right-[1px] after:top-[-3px] after:border-r-0 after:border-r-transparent after:border-y-transparent':
											state?.placement === 'left',
									},
								)}
							/>
						)}
					</div>
				</Transition>
			</TooltipPortal>

			{content}
		</>
	);
};

export const TooltipPortal = ({children}: {children: React.ReactNode}) => {
	let element;

	if (typeof document !== 'undefined') {
		element = document.getElementById('tooltip-portal');

		if (!element) {
			element = document.createElement('div');
			element.id = 'tooltip-portal';
			element.classList.add(...'z-[99999] fixed inset-0 pointer-events-none'.split(' '));
			document.body.appendChild(element);
		}
	}

	if (!element) return children;

	return createPortal(children, element);
};
