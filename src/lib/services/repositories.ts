import client from '@/lib/axios';
import type {Repository} from '@/models/Repository';

export const getRepositories = (): Promise<Repository[]> =>
	client<any[]>({
		url: `https://api.github.com/users/mauriziocarella/repos`,
		params: {
			sort: 'pushed',
		},
	})
		.then((res) => res.data)
		.then((repositories) =>
			repositories.map((repository) => ({
				...repository,
				url: repository.html_url,
				stars: repository.stargazers_count,
				forks: repository.forks_count,
			})),
		);
