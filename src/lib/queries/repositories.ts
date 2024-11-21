import {getRepositories} from '@/lib/services/repositories';

export const getRepositoriesQuery = {
	queryKey: ['repositories'],
	queryFn: getRepositories,
};
