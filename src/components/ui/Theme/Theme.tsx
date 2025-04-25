'use client';

import {useTheme} from 'next-themes';
import {useCallback, useEffect, useState} from 'react';
import {MoonIcon, SunIcon, SunMoonIcon} from 'lucide-react';
import {IconButton} from '@/components/ui/Button/Button';
import {AnimatePresence, motion} from 'framer-motion';

export const ThemeToggle = () => {
	const [mounted, setMounted] = useState(false);
	const {theme, setTheme} = useTheme();

	const toggleTheme = useCallback(() => {
		setTheme((theme) =>
			theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark',
		);
	}, [setTheme]);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<IconButton
			className="fixed bottom-4 right-4 overflow-hidden"
			onClick={toggleTheme}
			aria-label="Toggle theme">
			<AnimatePresence>
				<motion.span
					key={theme}
					className="absolute inset-0 flex justify-center items-center"
					initial={{y: 50, opacity: 0}}
					animate={{y: 0, opacity: 1}}
					exit={{y: -50, opacity: 0}}
					transition={{duration: 0.5}}>
					{theme === 'light' ? (
						<SunIcon />
					) : theme === 'dark' ? (
						<MoonIcon />
					) : (
						<SunMoonIcon />
					)}
				</motion.span>
			</AnimatePresence>
		</IconButton>
	);
};
