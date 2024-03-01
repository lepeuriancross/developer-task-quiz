// Component: SectionGame
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { GameData } from '@/types';

// Components (local)
import SectionWrapper from '@/components/sections/SectionWrapper';
import Game from '@/components/singles/Game/Game';

/*---------- Template ----------*/

// Types
export type SectionGameProps = {
	title?: string;
	body?: string;
	data: GameData;
};

// Default component
export default function SectionGame(props: SectionGameProps) {
	/*----- Props -----*/

	// Destructure props
	const {
		title = `Music trivia Game`,
		body = `Test your music knowledge with this fun trivia game.`,
		data,
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
			<Game data={data} />
		</SectionWrapper>
	);
}
