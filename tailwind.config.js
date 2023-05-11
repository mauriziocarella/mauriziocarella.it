const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				'3xl': '1940px',
				'4xl': '2260px',
			},
			minWidth: {
				'0': '0',
				'1/3': '33.333333%',
				'2/3': '66.666667%',
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%',
				'full': '100%',
			},
			colors: {
				'neutral': {
					DEFAULT: '#1F242D',
					50: '#E5E8ED',
					100: '#D7DCE4',
					200: '#BCC4D1',
					300: '#A1ACBE',
					400: '#8693AC',
					500: '#6B7B99',
					600: '#57657F',
					700: '#444F63',
					800: '#323A48',
					900: '#1F242D',
					950: '#1A1E25',
				},
				'neutral-content': {
					DEFAULT: '#1a1a1a',
					dark: '#e0e0e0',
				},
				'primary': {
					DEFAULT: '#8950EC',
					50: '#CFB8F7',
					100: '#C7ACF6',
					200: '#B895F3',
					300: '#A87EF1',
					400: '#9967EE',
					500: '#8950EC',
					600: '#7330E9',
					700: '#6018DD',
					800: '#5214BC',
					900: '#44119C',
					950: '#3D0F8C'
				},
				'success': colors.green[500],
				'success-content': '#ffffff',
				'success-focus': colors.green[600],
				'error': colors.red[500],
				'error-content': '#ffffff',
				'error-focus': colors.red[600],
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')({nocompatible: true})],
};
