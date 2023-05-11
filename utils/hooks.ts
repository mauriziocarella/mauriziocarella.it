'use client';

import {useCallback, useEffect, useState} from 'react';

export const useDarkMode = (): [boolean, () => void] => {
	const [darkMode, setDarkMode] = useState(
		typeof window !== 'undefined'
			? window.sessionStorage.getItem('darkMode')
				? window.sessionStorage.getItem('darkMode') === '1'
				: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
			: false,
	);

	useEffect(() => {
		const listener = (e: MediaQueryListEvent) => setDarkMode(e.matches);
		if (typeof window !== 'undefined') {
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
			}
		};
	}, []);

	const toggleTheme = useCallback(() => {
		setDarkMode((darkMode) => !darkMode);
	}, []);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		if (typeof window !== 'undefined') window.sessionStorage.setItem('darkMode', darkMode ? '1' : '0');
	}, [darkMode]);

	return [darkMode, toggleTheme];
};
