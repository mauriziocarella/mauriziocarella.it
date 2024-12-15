'use client';

import {useEffect} from 'react';
import {Button} from '@/components/Button';
import AppProviders from '@/components/providers';
import {SiteHead} from '@/components/Site';

type ErrorPageProps = {
	error: Error & {digest?: string};
	reset: () => void;
};

const ErrorPage = ({error, reset}: ErrorPageProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html>
			<SiteHead title />
			<body className="flex flex-col">
				<main className="flex-1 flex flex-col gap justify-center items-center text-center">
					<AppProviders>
						<h1 className="text-9xl">Ooops...</h1>
						<h2 className="text-md opacity-80">
							An unexpected error occurred.
						</h2>
						<Button onClick={() => reset()}>Try again</Button>
					</AppProviders>
				</main>
			</body>
		</html>
	);
};

export default ErrorPage;