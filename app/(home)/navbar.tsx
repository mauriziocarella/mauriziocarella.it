'use client';

import React from 'react';
import {useDarkMode, useIsServer} from '../../utils/hooks';
import {IconButton} from '../../components/Button';
import {MoonIcon, SunIcon} from '@heroicons/react/24/outline';

export const Navbar = () => {
	const [darkMode, toggleDarkMode] = useDarkMode();
	const isServer = useIsServer();

	return (
		<div className="bg-neutral-100/50 dark:bg-neutral-950/50 py-4 px-4 flex items-center fixed top-0 inset-x-0 -right-1 w-full z-10 shadow backdrop-blur-md h-16">
			<div className="flex-grow" />
			{!isServer && (
				<IconButton
					icon={darkMode ? MoonIcon : SunIcon}
					onClick={toggleDarkMode}
					tooltip="Click to toggle dark mode"
					aria-label="Toggle dark mode"
				/>
			)}
		</div>
	);
};
