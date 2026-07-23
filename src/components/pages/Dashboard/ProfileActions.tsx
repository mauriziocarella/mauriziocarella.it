'use client';

import {type MouseEvent, useCallback} from 'react';

export const EmailSocial = () => {
	const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		const user = 'info';
		const domain = 'mauriziocarella.it';
		window.location.href = `mailto:${user}@${domain}`;
	}, []);

	return (
		<a
			href="#email"
			title="Email"
			aria-label="Email"
			onClick={handleClick}
			className="inline-flex items-center w-fit gap-2 hover:underline underline-offset-2 font-medium transition-colors text-inherit hover:text-accent">
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="size-6"
				aria-hidden="true">
				<rect width="20" height="16" x="2" y="4" rx="2" />
				<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
			</svg>
		</a>
	);
};
