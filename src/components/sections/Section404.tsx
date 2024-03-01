// Component: Section404
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Components (local)
import SectionWrapper from '@/components/sections/SectionWrapper';

/*---------- Template ----------*/

// Types
export type Section404Props = {
	title?: string;
	body?: string;
};

// Default component
export default function Section404(props: Section404Props) {
	/*----- Props -----*/

	// Destructure props
	const {
		title = `404: Page not found`,
		body = `Sorry, we couldn’t find the page you’re looking for. Please refresh the page`,
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper>
			{(title || body) && (
				<div className="section__body text-center">
					{title && (
						<h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
							{title}
						</h1>
					)}
					{body && <p className="mt-6 text-base leading-7">{body}</p>}
				</div>
			)}
		</SectionWrapper>
	);
}
