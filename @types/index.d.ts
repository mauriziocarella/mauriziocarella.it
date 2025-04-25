import type {ComponentPropsWithoutRef, ElementType, Ref} from 'react';

export type Nullable<T> = T | null | undefined;
export type Primitive = string | number | boolean | null | undefined | Date;

export type Extend<A, B extends object | object[]> = [B] extends [any[]]
	? B extends [infer First, ...infer Rest extends object[]]
		? Extend<Omit<A, keyof First> & First, Rest>
		: A
	: Omit<A, keyof B> & B;

export type PolymorphicProps<
	Element extends ElementType,
	Props extends object = object,
	AsProps = ComponentPropsWithoutRef<Element>,
> = {
	as?: Element;
} & Extend<AsProps, Props>;
export type PolymorphicRef<Element extends ElementType> = Ref<
	ComponentPropsWithRef<Element>['ref']
>;
