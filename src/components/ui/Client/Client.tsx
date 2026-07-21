'use client';

import {type PropsWithChildren, useEffect, useState} from 'react';
import useIsClient from '@/lib/hooks/useIsClient';
import {LoadingIcon} from '@/components/ui/Loading/Loading';

export type ClientOnlyProps = PropsWithChildren;
export const ClientOnly = ({children}: ClientOnlyProps) => {
	const isMounted = useIsClient();

	if (!isMounted) {
		return null;
	}

	return <>{children}</>;
};

export type ClientLoader = {
	delay?: number;
};
export const ClientLoader = ({delay = 100}: ClientLoader) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setLoading(false), delay);
		return () => clearTimeout(timeout);
	}, [delay]);

	if (!loading) return null;

	return (
		<div className="flex justify-center items-center absolute inset-0 bg-background text-foreground">
			<LoadingIcon />
		</div>
	);
};
