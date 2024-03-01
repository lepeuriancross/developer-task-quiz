// Component: SectionAuth
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Components (local)
import SectionWrapper from '@/components/sections/SectionWrapper';
import AuthForm from '../singles/Auth/AuthForm';

/*---------- Template ----------*/

// Types
export type SectionAuthProps = {
	title?: string;
	body?: string;
};

// Default component
export default function SectionAuth(props: SectionAuthProps) {
	/*----- Props -----*/

	// Destructure props
	const {
		title = `Music trivia Game`,
		body = `Test your music knowledge with this fun trivia game.`,
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
			<AuthForm />
		</SectionWrapper>
	);
}
