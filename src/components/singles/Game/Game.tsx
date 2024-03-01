// Component: Game
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { User, GameData, Album } from '@/types';

// Scripts (node)
import { useState } from 'react';

// Scripts (local)
import { classNames, arShuffle } from '@/lib/utils';
import { useAuth } from '@/components/base/TheAuthProvider';

// Components (node)
import Image from 'next/image';
import { usePresence, motion, AnimatePresence } from 'framer-motion';
import { Freeze } from 'react-freeze';
import { StarIcon, XMarkIcon } from '@heroicons/react/24/solid';

/*---------- Static Data ----------*/

// Motion
const motionPage = {
	initial: (delay: number = 0) => ({
		x: '150%',
	}),
	animate: (delay: number = 0) => ({
		x: '0%',
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay,
		},
	}),
	exit: (delay: number = 0) => ({
		x: '-150%',
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay,
		},
	}),
};
const motionLi = {
	initial: (delay: number = 0) => ({
		x: '100%',
	}),
	animate: (delay: number = 0) => ({
		x: '0%',
		transition: { delay: 0.3 + delay },
	}),
};

/*---------- Template ----------*/

// Types
export type GameProps = {
	data: GameData;
};
export type GameIntroProps = {
	currentUser?: User | null;
	className?: string;
	onClickStart: () => void;
};
export type GameScoreboardProps = {
	countRound?: number;
	countAttempts: number;
	countSuccess: number;
	className?: string;
};
export type GameQuestionProps = {
	countRound: number;
	artist: string;
	question: Album;
	className?: string;
	onClick?: () => void;
	onSuccess: () => void;
};
export type GameInfoProps = {
	question: Album;
	className?: string;
	onClickNext: () => void;
};
export type GameButtonProps = {
	name: string;
	type: 'button' | 'submit';
	disabled?: boolean;
	theme?: 'light' | 'dark';
	className?: string;
	onClick?: () => void;
};
export type GameOptionProps = {
	name: string;
	disabled?: boolean;
	theme?: 'default' | 'correct' | 'incorrect';
	className?: string;
	onClick?: () => void;
};

// Default component
export default function Game(props: GameProps) {
	/*----- Props -----*/

	// Destructure props
	const { data } = props;

	/*----- Store -----*/

	// State - gameStatus
	const [gameStatus, setGameStatus] = useState<'idle' | 'question' | 'info'>(
		'idle'
	);

	// State - question
	const [question, setQuestion] = useState<Album>();

	// Context - isPresent
	const [isPresent, safeToRemove] = usePresence();

	// State - countRound
	const [countRound, setCountRound] = useState(0);

	// State - countGuesses (attempts made in this round)
	const [countAttempts, setCountAttempts] = useState(0);

	// State - countSuccess (total correct guesses made)
	const [countSuccess, setCountSuccess] = useState(0);

	// Context - auth
	const { currentUser } = useAuth();

	/*----- Methods -----*/

	// Function - start game
	function startGame() {
		// Roll a new question
		rollQuestion();
	}

	// Function - roll question
	function rollQuestion() {
		// Pick a random album
		const randomIndex = Math.floor(Math.random() * data.albums.length);
		const randomAlbum = data.albums[randomIndex];

		// Get options
		const altOptions = data.albums
			.map((o: Album) => {
				if (o.name !== randomAlbum.name) {
					return o.name;
				}
			})
			.sort(() => 0.5 - Math.random())
			.slice(0, 2);
		const options = arShuffle([randomAlbum.name, ...altOptions]);

		// Set state
		setCountRound(countRound + 1);
		setQuestion({ ...randomAlbum, options });

		// Set game status - question
		setGameStatus('question');
	}

	// Function - handleClick
	function handleClick() {
		// Update state
		setCountAttempts(countAttempts + 1);
	}

	// Function - handleSuccess
	function handleSuccess() {
		// Set state
		setGameStatus('info');

		// Update state
		setCountSuccess(countSuccess + 1);
	}

	// Function - handleNext
	function handleNext() {
		// Roll a new question
		rollQuestion();
	}

	/*----- Init -----*/

	// Return default
	return (
		<div className="game w-full max-w-sm mx-auto space-y-6 select-none md:max-w-xl">
			{/* Scoreboard */}
			{(gameStatus === 'question' || gameStatus === 'info') && (
				<motion.div
					className="game__page--question"
					initial="initial"
					animate="animate"
					exit="exit"
					variants={motionPage}
					custom={0.3}
				>
					<GameScoreboard
						countRound={countRound}
						countAttempts={countAttempts}
						countSuccess={countSuccess}
					/>
				</motion.div>
			)}

			{/* Pages */}
			<AnimatePresence mode="wait">
				{gameStatus === 'idle' ? (
					<motion.div
						className="game__page--intro"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={motionPage}
						onCompositionEnd={() => {
							if (!isPresent) {
								safeToRemove();
							}
						}}
					>
						<Freeze freeze={!isPresent}>
							<GameIntro currentUser={currentUser} onClickStart={startGame} />
						</Freeze>
					</motion.div>
				) : gameStatus === 'question' && question ? (
					<motion.div
						key={`game-question-${countRound}`}
						className="game__page--question"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={motionPage}
						onCompositionEnd={() => {
							if (!isPresent) {
								safeToRemove();
							}
						}}
					>
						<Freeze freeze={!isPresent}>
							<GameQuestion
								countRound={countRound}
								artist={data.artist}
								question={question}
								onClick={handleClick}
								onSuccess={handleSuccess}
							/>
						</Freeze>
					</motion.div>
				) : gameStatus === 'info' && question ? (
					<motion.div
						key={`game-info-${countRound}`}
						className="game__page--question"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={motionPage}
						onCompositionEnd={() => {
							if (!isPresent) {
								safeToRemove();
							}
						}}
					>
						<Freeze freeze={!isPresent}>
							<GameInfo question={question} onClickNext={handleNext} />
						</Freeze>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}

// GameIntro component
export function GameIntro(props: GameIntroProps) {
	/*----- Props -----*/

	// Destructure props
	const { currentUser, className, onClickStart = () => {} } = props;

	/*----- Init -----*/

	// Return
	return (
		<div className={classNames(`game__intro w-full text-center`, className)}>
			<div className="game__container rounded-lg p-6 shadow bg-white text-black">
				<div className="game__row flex flex-col justify-center items-center">
					<h1 className="game__title w-full max-w-sm mx-auto font-title font-semibold text-2xl mb-4">
						Welcome {currentUser?.name?.split(' ')[0] ?? 'to the game'}!
					</h1>
					<p className="game__text font-body text-base">
						You will be shown a series of album covers. Identify the artist from
						the options provided.
					</p>
					<div className="game__buttons">
						<GameButton
							name="Start Game"
							type="button"
							theme="dark"
							className="mt-6"
							onClick={onClickStart}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

// GameScoreboard component
export function GameScoreboard(props: GameScoreboardProps) {
	/*----- Props -----*/

	// Destructure props
	const {
		countRound = 0,
		countAttempts = 0,
		countSuccess = 0,
		className,
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(`game__scoreboard w-full text-center`, className)}
		>
			<div className="game__container">
				<div className="game__row flex flex-col justify-center items-center">
					<ul className="game__info flex flex-col justify-center items-center w-full space-y-2 font-body text-base md:flex-row md:justify-between md:space-y-0 md:space-x-4">
						<li className="game__info-item w-full rounded-full px-4 py-2 bg-blue/50">
							Round: <span className="font-semibold">{countRound}</span>
						</li>
						<li className="game__info-item w-full block rounded-full px-4 py-2 bg-blue/50">
							Attempts: <span className="font-semibold">{countAttempts}</span>
						</li>
						<li className="game__info-item w-full block rounded-full px-4 py-2 bg-blue/50">
							Score: <span className="font-semibold">{countSuccess}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

// GameQuestion component
export function GameQuestion(props: GameQuestionProps) {
	/*----- Props -----*/

	// Destructure props
	const {
		countRound,
		artist,
		question,
		className,
		onClick = () => {},
		onSuccess = () => {},
	} = props;

	/*----- Store -----*/

	// State - answers
	const [answers, setAnswers] = useState<string[]>([]);

	/*----- Methods -----*/

	// Function - handle click answer
	function handleClickAnswer(option: string) {
		// Update state
		setAnswers([...answers, option]);

		// Count a click
		onClick();

		// If correct
		if (option === question.name) {
			// Update state
			setTimeout(() => {
				onSuccess();
			}, 1000);
		}
	}

	/*----- Init -----*/

	// Return
	return (
		<div
			className={classNames(`game__question w-full overflow-hidden`, className)}
		>
			<div className="game__question-container rounded-lg p-7 shadow bg-white text-black">
				<div className="game__row grid gap-6 md:grid-cols-2">
					<div className="game__col flex flex-col justify-start">
						<div className="game__cover relative border rounded-md overflow-hidden border-grey">
							<Image
								className="game__cover-img--hidden relative z-10 block w-full"
								src={`${question.cover_image_path}.jpg`}
								alt={`${artist}`}
								width={320}
								height={320}
							/>
							{answers.includes(question.name) && (
								<motion.div
									className="game__cover-img--revealed absolute z-20 top-0 left-0 w-full h-auto"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<Image
										className=""
										src={`${question.cover_image_path}_answer.jpg`}
										alt={`${question.name}`}
										width={320}
										height={320}
									/>
								</motion.div>
							)}
						</div>
					</div>
					<div className="game__col flex flex-col justify-between space-y-4">
						<h2 className="game__subtitle flex justify-between font-title font-semibold text-xl">
							<span className="game__subtitle-text">{artist}</span>
							<span className="game__subtitle-count">
								<span className="game__subtitle-count-round">
									# {countRound}{' '}
								</span>
							</span>
						</h2>
						<ul className="game__options space-y-3">
							{question.options.map((option, o) => (
								<motion.li
									key={`game-option-${o}`}
									className="game__option"
									initial="initial"
									animate="animate"
									variants={motionLi}
									custom={o * 0.05}
								>
									<GameOption
										name={option}
										disabled={
											answers.includes(question.name) ||
											answers.includes(option)
										}
										theme={
											answers.includes(option)
												? option === question.name
													? 'correct'
													: 'incorrect'
												: 'default'
										}
										onClick={() => {
											handleClickAnswer(option);
										}}
									/>
								</motion.li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

// GameInfo component
export function GameInfo(props: GameInfoProps) {
	/*----- Props -----*/

	// Destructure props
	const { question, className, onClickNext = () => {} } = props;

	/*----- Init -----*/

	console.log(question);

	// Return
	return (
		<div className={classNames(`game__info w-full text-center`, className)}>
			<div className="game__container rounded-lg p-6 shadow bg-white text-black">
				<div className="game__row flex flex-col justify-center items-center">
					<h2 className="game__title w-full max-w-sm mx-auto font-title font-semibold text-2xl mb-4">
						<span>Correct! It was</span>
						<span className="block">&quot;{question.name}&quot;</span>
					</h2>
					<ul className="game__info font-body text-base">
						<li className="game__info-item">Album length: {question.length}</li>
						<li className="game__info-item">Tracks: {question.tracks}</li>
					</ul>
					<div className="game__buttons">
						<GameButton
							name="Next Round"
							type="button"
							theme="dark"
							className="mt-6"
							onClick={onClickNext}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

// GameButton component
export function GameButton(props: GameButtonProps) {
	/*----- Props -----*/

	// Destructure props
	const {
		name,
		type = 'button',
		disabled = false,
		theme = 'light',
		className,
		onClick = () => {},
	} = props;

	/*----- Init -----*/

	// Return default
	return (
		<button
			className={classNames(
				`game__button relative inlinline-block h-[45px] w-full rounded-full overflow-hidden cursor-pointer group transiiton-transform duration-300 ease-out hover:scale-110 text-white`,
				disabled
					? 'pointer-events-none cursor-not-allowed'
					: 'pointer-events-auto cursor-pointer',
				className
			)}
			type={type}
			onClick={onClick}
		>
			<div
				className={classNames(
					`game__button-bg absolute z-10 top-0 left-0 w-full h-full border-[2px] rounded-full`,
					theme === 'light'
						? `border-white/50 group-hover:border-white`
						: 'bg-gradient-to-r from-blue to-purple'
				)}
			/>
			<div className="game__button-container relative z-30 flex justify-center items-center px-6 space-x-3">
				{name}
			</div>
		</button>
	);
}

// GameOption component
export function GameOption(props: GameOptionProps) {
	/*----- Props -----*/

	// Destructure props
	const {
		name,
		disabled = false,
		theme = 'default',
		className,
		onClick,
	} = props;

	/*----- Init -----*/

	// Return
	return (
		<button
			className={classNames(
				`game__option relative inlinline-block h-[60px] w-full rounded-lg overflow-hidden cursor-pointer group transiiton-transform duration-500 ease-out hover:scale-110`,
				disabled
					? 'pointer-events-none cursor-not-allowed'
					: 'pointer-events-auto cursor-pointer',
				className
			)}
			type="button"
			disabled={disabled}
			onClick={onClick}
		>
			<div
				className={classNames(
					`game__option-bg absolute z-10 top-0 left-0 w-full h-full border rounded-lg border-grey`
				)}
			/>
			<div
				className={classNames(
					`game__option-highlight absolute z-20 top-0 left-0 h-full transition-all duration-200 ease-out`,
					theme === 'default' && `w-0 group-hover:w-full bg-gold`,
					theme === 'correct' && `w-full bg-green`,
					theme === 'incorrect' && `w-full bg-red`
				)}
			/>
			<span className="game__option-container relative z-30 flex justify-start items-center px-5 space-x-3">
				<span
					className={classNames(
						`game__option-box w-5 min-w-5 border rounded overflow-hidden bg-white`,
						theme === 'default' && `border-black`,
						theme === 'correct' && `border-green-dark text-green-dark`,
						theme === 'incorrect' && `border-red-dark text-red-dark`
					)}
				>
					<span className="game__option-box-icon relative block w-full pt-[100%]">
						{theme === 'correct' && (
							<StarIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-auto" />
						)}
						{theme === 'incorrect' && (
							<XMarkIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-auto" />
						)}
					</span>
				</span>
				<span className="game__option-text overflow-hidden grow font-button font-semibold text-sm text-left line-clamp-1">
					{name}
				</span>
			</span>
		</button>
	);
}
