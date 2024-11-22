'use client';

import {ThemeProvider as ReactThemeProvider} from 'next-themes';
import {type PropsWithChildren, useCallback} from 'react';
import {ThemeToggle} from '@/components/Theme';
import {useEvent, useMount} from 'react-use';

const ThemeProvider = ({children}: PropsWithChildren) => {
	const resize = useCallback(() => {
		const html = document.documentElement;
		html.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
	}, []);

	useMount(resize);
	useEvent('resize', resize);

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
