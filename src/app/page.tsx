import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import Repositories from '@/components/pages/Dashboard/Repositories';
import Profile from '@/components/pages/Dashboard/Profile';
import {getRepositoriesQuery} from '@/lib/queries/repositories';

export default async function RepositoriesPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(getRepositoriesQuery);

	const state = dehydrate(queryClient);

	return (
		<HydrationBoundary state={state}>
			<Profile />
			<Repositories />
		</HydrationBoundary>
	);
}
