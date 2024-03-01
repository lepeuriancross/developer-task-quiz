// Component: RootLayout
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import type { Config } from 'tailwindcss';

/*---------- Config ----------*/

// Config
const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				blue: { DEFAULT: '#5643CE' },
				gold: { DEFAULT: '#D1A92B', dark: '#BC9827' },
				green: { DEFAULT: '#38D177', dark: '#33BD6B' },
				grey: { DEFAULT: '#D9E2EB' },
				purple: { DEFAULT: '#C774D2' },
				red: { DEFAULT: '#D13865', dark: '#BC325B' },
			},
			fontFamily: {
				title: ['var(--font-title)'],
				body: ['var(--font-body)'],
				button: ['var(--font-button)'],
			},
		},
	},
	plugins: [],
};
export default config;
