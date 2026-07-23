import {getRepositories} from '@/lib/services/repositories';
import type {UseQueryOptions} from '@tanstack/react-query';

export const getRepositoriesQuery: UseQueryOptions<
	Awaited<ReturnType<typeof getRepositories>>
> = {
	queryKey: ['repositories'],
	queryFn: getRepositories,
	staleTime: 15 * 60 * 1000,
};
