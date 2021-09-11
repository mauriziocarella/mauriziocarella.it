import { useEffect, useState } from 'react';

export const useDarkMode = (): [string, () => void] => {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		setTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

		window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (e) => setTheme(e.matches ? 'dark' : 'light'));
	}, [])

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	};

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	return [theme, toggleTheme]
};
