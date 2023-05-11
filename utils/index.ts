import {twMerge} from 'tailwind-merge';
import cls, {Argument} from 'classnames';

export const classNames = (...params: Argument[]) => {
	return twMerge(cls(...params));
};
