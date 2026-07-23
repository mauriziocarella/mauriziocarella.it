'use client';

import {
	useQuery as useReactQuery,
	type UseQueryOptions as UseReactQueryOptions,
} from '@tanstack/react-query';
import type {AxiosRequestConfig} from 'axios';
import client from '@/lib/axios';

const isUseQueryOptions = <Data>(
	options: Record<never, never>,
): options is UseReactQueryOptions<Data> =>
	'queryKey' in options && 'queryFn' in options;

type UseQueryOptions<Data> =
	| string
	| AxiosRequestConfig
	| UseReactQueryOptions<Data>;

const useQuery = <Data>(
	config: UseQueryOptions<Data>,
	// options?: Partial<UseQueryOptions>,
) => {
	let c: UseReactQueryOptions<Data>;
	if (isUseQueryOptions<Data>(config)) {
		c = config;
	} else {
		if (typeof config === 'string') {
			c = {
				queryFn: () => client(config).then(({data}) => data),
				queryKey: [config],
			};
		} else {
			c = {
				queryFn: () => client(config).then(({data}) => data),
				queryKey: [config],
			};
		}
	}

	return useReactQuery(c);
};

export default useQuery;
