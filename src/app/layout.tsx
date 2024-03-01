// Component: RootLayout
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import type { Metadata } from 'next';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (local)
// ...

// Fonts
import { Poppins } from 'next/font/google';

// Scripts
import './globals.css';

/*---------- Static Data ----------*/

// Fonts
const fontTitle = Poppins({
	weight: '600',
	subsets: ['latin'],
	variable: '--font-title',
});
const fontBody = Poppins({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-body',
});
const fontButton = Poppins({
	weight: '600',
	subsets: ['latin'],
	variable: '--font-body',
});

// Metadata
export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

/*---------- Template ----------*/

// Types
export type RootLayoutProps = {
	children: React.ReactNode;
};

// Default component
export default function RootLayout(props: Readonly<RootLayoutProps>) {
	/*----- Props -----*/

	// Destructure props
	const { children } = props;

	/*----- Props -----*/

	// Return default
	return (
		<html lang="en">
			<body
				className={classNames(
					`body flex flex-col justify-start items-center min-h-screen bg-gradient-to-br from-purple to-blue text-white`,
					fontTitle.variable,
					fontBody.variable,
					fontButton.variable
				)}
			>
				{children}
			</body>
		</html>
	);
}
