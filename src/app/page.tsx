// Component: PageHome
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticData } from '@/data/staticData';

// Scripts
// ...

// Components
import TheAuthProvider from '@/components/base/TheAuthProvider';
import SectionGame from '@/components/sections/SectionGame';
import Section404 from '@/components/sections/Section404';

/*---------- Template ----------*/

// Default component
export default async function PageHome() {
	/*----- Init -----*/

	// If development, use static data
	if (process.env.NODE_ENV === 'development') {
		return (
			<TheAuthProvider>
				<SectionGame data={staticData} />
			</TheAuthProvider>
		);
	}

	// Fetch JSON data
	let data;
	try {
		const response = await fetch(
			'https://frontend-interview.evidentinsights.com/'
		);
		if (!response.ok) {
			return (
				<Section404
					title={`400: Bad Request`}
					body={`The server could not understand the request. Please try again later.`}
				/>
			);
		}
		data = await response.json();
	} catch (error) {
		return (
			<Section404
				title={`???: Fetch failed`}
				body={`There was an error fetching the data. Please try again later.`}
			/>
		);
	}

	// Return default
	return (
		<main className="page w-full">
			<TheAuthProvider>
				<SectionGame data={data} />
			</TheAuthProvider>
		</main>
	);
}
