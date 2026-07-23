'use client';

import {ThemeProvider as ReactThemeProvider} from 'next-themes';
import {type PropsWithChildren, useCallback, useEffect} from 'react';
import {ThemeToggle} from '@/components/ui/Theme/Theme';

const ThemeProvider = ({children}: PropsWithChildren) => {
	const resize = useCallback(() => {
		const html = document.documentElement;
		html.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
	}, []);

	useEffect(() => {
		resize();
		window.addEventListener('resize', resize);

		return () => window.removeEventListener('resize', resize);
	}, [resize]);

	return (
		<ReactThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem={true}>
			{children}
			<ThemeToggle />
		</ReactThemeProvider>
	);
};

export default ThemeProvider;
