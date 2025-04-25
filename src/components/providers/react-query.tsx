'use client';

import {type PropsWithChildren} from 'react';
import {isServer, QueryClient, QueryClientProvider,} from '@tanstack/react-query';
import {persistQueryClient} from '@tanstack/react-query-persist-client';
import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';

function makeQueryClient() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 60 * 24,
			},
		},
	});

	if (typeof window !== 'undefined') {
		persistQueryClient({
			queryClient,
			persister: createSyncStoragePersister({
				storage: window.localStorage,
			}),
		});
	}

	return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

const ReactQueryProvider = ({children}: PropsWithChildren) => {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
