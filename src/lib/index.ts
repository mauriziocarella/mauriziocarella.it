import {MutableRefObject, Ref} from 'react';

export function mergeRefs<T>(...refs: (Ref<T> | undefined | null)[]): Ref<T> {
	return (instance: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(instance);
			} else if (ref && typeof ref === 'object') {
				(ref as MutableRefObject<T | null>).current = instance;
			}
		});
	};
}

export function setNativeValue(element: HTMLElement, value: string) {
	const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set;
	const prototype = Object.getPrototypeOf(element);
	const prototypeValueSetter = Object.getOwnPropertyDescriptor(
		prototype,
		'value',
	)?.set;

	if (valueSetter && valueSetter !== prototypeValueSetter) {
		prototypeValueSetter?.call(element, value);
	} else {
		valueSetter?.call(element, value);
	}
	element.dispatchEvent(new Event('input', {bubbles: true}));
}
