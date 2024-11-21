'use client';

import {ThemeProvider as ReactThemeProvider} from 'next-themes';
import type {PropsWithChildren} from 'react';
import {ThemeToggle} from '@/components/Theme';

const ThemeProvider = ({children}: PropsWithChildren) => {
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
