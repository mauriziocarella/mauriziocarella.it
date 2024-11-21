'use client';

import useQuery from '@/lib/hooks/useQuery';
import {getRepositoriesQuery} from '@/lib/queries/repositories';
import {Card} from '@/components/Card';
import {Link} from '@/components/Link';
import {LoadingIcon} from '@/components/Loading';

export default function Repositories() {
	const {data: repositories, isLoading} = useQuery(getRepositoriesQuery);

	return (
		<div>
			<div className="container mx-auto px-4 py-10">
				<h1 className="text-4xl font-bold mb-8">My Repositories</h1>

				<div>
					{isLoading ? (
						<LoadingIcon className="mx-auto" />
					) : !repositories?.length ? (
						<></>
					) : (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{repositories?.map((repository) => (
								<Card
									key={repository.id}
									className="flex flex-col">
									<h2 className="text-xl font-semibold">
										{repository.name}
									</h2>
									<p className="flex-1 opacity-80 mt-2">
										{repository.description}
									</p>
									<Link
										href={repository.url}
										target="_blank"
										className="mt-4">
										View on GitHub →
									</Link>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
