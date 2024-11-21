import type {Config} from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import resolveConfig from 'tailwindcss/resolveConfig';
import defaultConfig from 'tailwindcss/defaultConfig';

const {theme} = resolveConfig(defaultConfig);

export default {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			spacing: {
				DEFAULT: '1rem',
			},
			borderColor: {
				DEFAULT: 'var(--border-color)',
			},
			transitionDuration: {
				DEFAULT: '300ms',
			},
			colors: {
				primary: {
					DEFAULT: '#8B5CF6',
					50: '#C9B3FB',
					100: '#C2A9FA',
					200: '#B496F9',
					300: '#A783F8',
					400: '#996FF7',
					500: '#8B5CF6',
					600: '#7D49F5',
					700: '#6F35F4',
					800: '#6222F3',
					900: '#540FF2',
					950: '#500DE9',
				},
				accent: {
					DEFAULT: '#559FFF',
					50: '#9AC6FF',
					100: '#92C2FF',
					200: '#83B9FF',
					300: '#74B0FF',
					400: '#64A8FF',
					500: '#559FFF',
					600: '#2C88FF',
					700: '#0371FF',
					800: '#005FDA',
					900: '#004DB1',
					950: '#00449C',
				},
				success: {
					DEFAULT: '#10B981',
					50: '#8CF5D2',
					100: '#79F3CB',
					200: '#53F0BC',
					300: '#2EEDAE',
					400: '#13DF9B',
					500: '#10B981',
					600: '#0EA674',
					700: '#0D9367',
					800: '#0B815A',
					900: '#0A6E4D',
					950: '#096546',
				},
				background: {
					DEFAULT: 'var(--background)',
					light: '#ffffff',
					dark: '#0d1117',
				},
				foreground: {
					DEFAULT: 'var(--foreground)',
					light: '#0d1117',
					dark: '#ffffff',
				},
			},
			zIndex: {
				modal: '700',
				tooltip: '800',
			},
		},
	},
	plugins: [
		plugin(function ({addVariant}) {
			addVariant('hocus', ['&:hover', '&:focus']);
			addVariant('group-hocus', [
				':merge(.group):hover &',
				':merge(.group):focus-within &',
			]);
		}),
	],
} satisfies Config;
