// Component: AuthForm
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { User } from '@/types';

// Scripts (node)
import { useRef, useState, forwardRef, useImperativeHandle } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useAuth } from '@/components/base/TheAuthProvider';

// Components (node)
import { motion } from 'framer-motion';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

// Components (local)
import { GameButton } from '@/components/singles/Game/Game';

/*---------- Template ----------*/

// Types
export type AuthFormProps = {
	className?: string;
};

// Motion
const motionParent = {
	hidden: {
		height: 0,
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeIn',
		},
	},
	visible: {
		height: 'auto',
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeIn',
		},
	},
};

// Default component
export default function AuthForm(props: AuthFormProps) {
	/*----- Props -----*/

	// Deconstruct props
	const { className } = props;

	/*----- Refs -----*/

	// Ref - inputValues
	const inputValues = useRef({ name: '', email: '' });

	// Ref inputName
	const inputNameEl = useRef<HTMLInputElement>(null);

	// Ref inputEmail
	const inputEmailEl = useRef<HTMLInputElement>(null);

	/*----- Store -----*/

	// State - isHidden
	const [isHidden, setIsHidden] = useState(false);

	// State - errors
	const [errors, setErrors] = useState<{
		name?: string;
		email?: string;
	}>({});

	// Context - useAuth
	const { singIn } = useAuth();

	/*----- Methods -----*/

	// Function crude validation
	const validateAll = () => {
		// Defaults
		let isValid = true;

		// Clear errors
		setErrors({});

		// If name is empty
		if (!inputValues.current.name) {
			setErrors((prev) => ({ ...prev, name: 'Name is required' }));
			isValid = false;
		}

		// If email is empty
		if (!inputValues.current.email) {
			setErrors((prev) => ({ ...prev, email: 'Email is required' }));
			isValid = false;
		}

		// If email is invalid
		if (
			inputValues.current.email &&
			!/\S+@\S+\.\S+/.test(inputValues.current.email)
		) {
			setErrors((prev) => ({ ...prev, email: 'Email is invalid' }));
			isValid = false;
		}

		// Return
		return isValid;
	};

	// Function - update value
	const updateValue = (name: 'name' | 'email', value: string) => {
		console.log('Input changed', inputValues.current);
		inputValues.current[name] = value;
	};

	// Handler - input change
	const handleChange = (e: { name: string; value: string }) => {
		updateValue(e.name as 'name' | 'email', e.value);
	};

	// Handler - submit
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Validate
		const isValid = validateAll();

		// If valid
		if (isValid) {
			// Hide form
			setIsHidden(true);

			// Sing in
			setTimeout(() => {
				singIn(inputValues.current.name, inputValues.current.email);
			}, 300);
		}
	};

	/*----- Init -----*/

	// Render default
	return (
		<motion.form
			className={classNames(
				`form w-full max-w-sm border rounded-lg backdrop-blur shadow-lg overflow-hidden bg-white/10 border-white/50 shadow-purple text-white`,
				isHidden && 'pointer-events-none',
				className
			)}
			onSubmit={handleSubmit}
			noValidate
			initial="hidden"
			animate={isHidden ? 'hidden' : 'visible'}
			variants={motionParent}
		>
			<div className="form__container p-6 space-y-4 lg:p-8">
				<div className="form__row">
					<div className="form__body space-y-3">
						<h2 className="title font-title text-xl">Who&apos;s playing?</h2>
					</div>
				</div>
				<div className="form__row">
					<AuthInputText
						ref={inputNameEl}
						id="name"
						as="text"
						label="Name"
						placeholder="Your Name"
						defaultValue={inputValues.current.name}
						error={errors.name}
						onChange={handleChange}
					/>
				</div>
				<div className="form__row">
					<AuthInputText
						ref={inputEmailEl}
						id="email"
						as="email"
						label="Email"
						defaultValue={inputValues.current.email}
						placeholder="your@email.com"
						error={errors.email}
						onChange={handleChange}
					/>
				</div>
				<div className="form__row pt-4">
					<GameButton className="w-full" type="submit" name="Get started" />
				</div>
			</div>
		</motion.form>
	);
}

// Types
export type AuthInputTextProps = {
	id: string;
	as: 'text' | 'email';
	label?: string;
	name?: string;
	placeholder?: string;
	defaultValue?: string;
	description?: string;
	error?: string;
	className?: string;
	onChange?: (e: { name: string; value: string }) => void;
};

// Default component
function AuthInputTextFxn(props: AuthInputTextProps, ref: React.Ref<any>) {
	/*----- Props -----*/

	// Deconstruct props
	const {
		as = 'text',
		label,
		placeholder = 'your@email.com',
		defaultValue,
		description,
		error,
		id,
		className,
		onChange = (e: { name: string; value: string }) => {},
	} = props;

	/*----- Refs -----*/

	// Ref - inputEl
	const inputEl = useRef<HTMLInputElement>(null);

	/*----- Methods -----*/

	// Function - focus
	const focus = () => {
		inputEl.current?.focus();
	};

	// Function - update input
	const update = (value: string) => {
		if (!inputEl.current) return;

		// Update field value
		inputEl.current.value = value;

		// Callback
		onChange({
			name: id,
			value,
		});
	};

	// Handler - change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		update(e.target.value);
	};

	/*----- Init -----*/

	// Expose custom handles as a ref
	useImperativeHandle(ref, () => ({
		inputEl,
		focus,
		update,
	}));

	// Render default
	return (
		<div className={classNames(`input text-left`, className)}>
			{label && (
				<label
					className="input__label block text-sm font-medium leading-6"
					htmlFor={id}
				>
					{label}
				</label>
			)}
			<div className="input__field relative mt-2 rounded-md shadow-sm">
				<input
					ref={inputEl}
					id={id}
					className={classNames(
						`block w-full border rounded-md px-3 py-1.5 pr-10 outline-none transition-color duration-300 ease-out bg-transparent placeholder:text-white/50`,
						error
							? 'border-red-500/50 text-white focus:border-red-500'
							: 'border-white/50 focus:border-white'
					)}
					type={as}
					name="email"
					placeholder={placeholder}
					defaultValue={defaultValue}
					aria-invalid="true"
					aria-describedby={`${id}-message`}
					onChange={handleChange}
				/>
				{error && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<ExclamationCircleIcon
							className="h-5 w-5 text-red-500"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>
			{error ? (
				<p id={`${id}-message`} className="mt-1 font-bold text-xs text-red-500">
					{error}
				</p>
			) : (
				<>
					{description && (
						<p id={`${id}-message`} className="mt-1 text-xs text-white">
							{description}
						</p>
					)}
				</>
			)}
		</div>
	);
}
export const AuthInputText = forwardRef(AuthInputTextFxn);
