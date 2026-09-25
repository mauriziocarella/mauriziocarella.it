'use client';

import {useEffect, useRef, useState} from 'react';
import useQuery from '@/lib/hooks/useQuery';
import {getRepositoriesQuery} from '@/lib/queries/repositories';
import {Link} from '@/components/ui/Link/Link';
import {ArrowUpRightIcon, StarIcon} from 'lucide-react';
import Icon from '@/components/ui/Icons/Icon';
import {SpotlightCard} from '@/components/ui/Card/SpotlightCard';
import {Card} from '@/components/ui/Card/Card';
import {Container3D} from '@/components/ui/Containers/Container3D';

const skeletonItems = Array.from({length: 6}, (_, index) => index);

const RepositoriesSkeleton = () => (
	<div role="status" aria-live="polite">
		<span className="sr-only">Loading repositories</span>
		<div
			aria-hidden="true"
			className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{skeletonItems.map((item) => (
				<Card
					key={item}
					className="flex min-h-40 animate-pulse flex-col motion-reduce:animate-none">
					<div className="h-5 w-2/5 rounded bg-background-950" />
					<div className="mt-4 h-4 w-5/6 rounded bg-background-950" />
					<div className="mt-2 h-4 w-2/3 rounded bg-background-950" />
					<div className="mt-auto h-4 w-32 rounded bg-background-950" />
				</Card>
			))}
		</div>
	</div>
);

export default function Repositories() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [shouldLoad, setShouldLoad] = useState(false);
	const {data: repositories, isLoading} = useQuery({
		...getRepositoriesQuery,
		enabled: shouldLoad,
	});

	useEffect(() => {
		const element = containerRef.current;
		if (!element || shouldLoad) return;

		if (typeof IntersectionObserver === 'undefined') {
			const timeout = globalThis.setTimeout(
				() => setShouldLoad(true),
				0,
			);
			return () => globalThis.clearTimeout(timeout);
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;

				setShouldLoad(true);
				observer.disconnect();
			},
			{rootMargin: '400px 0px'},
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [shouldLoad]);

	return (
		<div ref={containerRef}>
			<div className="container mx-auto px-4 py-10">
				<h1 className="text-4xl font-bold mb-8">My Repositories</h1>

				<div>
					{shouldLoad && isLoading ? (
						<RepositoriesSkeleton />
					) : !repositories?.length ? (
						<></>
					) : (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{repositories?.map((repository) => (
								<Link
									key={repository.id}
									href={repository.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`View ${repository.name} on GitHub`}
									className="group block h-full w-full rounded-2xl font-normal text-inherit hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0">
									<SpotlightCard
										as={Container3D}
										containerClassName="card-border-trace h-full cursor-pointer"
										className="flex flex-col">
										<h2 className="text-xl font-semibold">
											{repository.name}
										</h2>
										<p className="flex-1 opacity-80 mt-2">
											{repository.description}
										</p>

										<div className="flex flex-wrap mt-2">
											{repository.stars > 0 && (
												<Icon name={StarIcon}>
													{repository.stars}
												</Icon>
											)}
										</div>

										<span className="mt-4 inline-flex w-fit items-center gap-2 font-medium text-accent group-hover:underline underline-offset-2">
											View on GitHub
											<Icon
												name={ArrowUpRightIcon}
												className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
											/>
										</span>
									</SpotlightCard>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
