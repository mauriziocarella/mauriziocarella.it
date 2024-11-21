import {useId as useReactId} from 'react';

const useId = (id?: string) => {
	const defaultId = useReactId();

	return id ?? defaultId;
};

export default useId;
