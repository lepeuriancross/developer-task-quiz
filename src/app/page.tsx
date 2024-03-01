// Component: PageHome
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

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

	// Fetch JSON data
	const response = await fetch(
		'https://frontend-interview.evidentinsights.com/'
	);

	// If error return 404
	if (!response.ok) {
		return (
			<Section404
				title={`400: Bad Request`}
				body={`A status code of 400 indicates that the server did not understand the request due to bad syntax.`}
			/>
		);
	}

	// Get data
	const data = await response.json();

	// Return default
	return (
		<main className="page w-full">
			<TheAuthProvider>
				<SectionGame data={data} />
			</TheAuthProvider>
		</main>
	);
}
