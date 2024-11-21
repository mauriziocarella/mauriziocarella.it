import {type Dispatch, useState} from 'react';

const useStateRef = <ElementType>(): [
	ElementType | null,
	Dispatch<ElementType | null>,
] => {
	const [ref, setRef] = useState<ElementType | null>(null);

	return [ref, setRef];
};

export default useStateRef;
