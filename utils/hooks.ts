'use client';

import {useCallback, useEffect, useState} from 'react';

export const useDarkMode = (): [boolean, () => void] => {
	const [darkMode, setDarkMode] = useState(
		window.sessionStorage.getItem('darkMode')
			? window.sessionStorage.getItem('darkMode') === '1'
			: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
	);

	useEffect(() => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => setDarkMode(e.matches));
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

		window.sessionStorage.setItem('darkMode', darkMode ? '1' : '0');
	}, [darkMode]);

	return [darkMode, toggleTheme];
};
