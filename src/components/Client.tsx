import {type PropsWithChildren, useEffect, useState} from 'react';
import {LoadingIcon} from '@/components/Loading';

export type ClientOnlyProps = PropsWithChildren;
export const ClientOnly = ({children}: ClientOnlyProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

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
		setTimeout(() => setLoading(false), delay);
	}, [delay]);

	if (!loading) return null;

	return (
		<div className="flex justify-center items-center absolute inset-0 bg-background text-foreground">
			<LoadingIcon />
		</div>
	);
};
