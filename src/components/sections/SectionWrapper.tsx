// Component: SectionWrapper
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts
import { classNames } from '@/lib/utils';

/*---------- Template ----------*/

// Types
type SectionWrapperProps = {
	children: React.ReactNode;
	className?: string;
};

// Default component
export default function SectionWrapper(props: Readonly<SectionWrapperProps>) {
	/*----- Props -----*/

	// Destructure props
	const { className, children } = props;

	/*----- Init -----*/

	// Return default
	return (
		<section className={classNames('section w-full', className)}>
			<div className="section__container px-6 py-12 lg:px-8">
				<div className="section__container-inner container flex flex-col justify-center items-center mx-auto space-y-8">
					{children}
				</div>
			</div>
		</section>
	);
}
