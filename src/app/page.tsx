import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {getRepositoriesQuery} from '@/lib/queries/repositories';
import DashboardPage from '@/components/pages/Dashboard/Page';

export default async function RepositoriesPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(getRepositoriesQuery);

	const state = dehydrate(queryClient);

	return (
		<HydrationBoundary state={state}>
			<DashboardPage />
		</HydrationBoundary>
	);
}
