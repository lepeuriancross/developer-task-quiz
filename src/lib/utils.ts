// Scripts: Utility Functions
/*----------------------------------------------------------------------------------------------------*/

/*---------- Styles ----------*/

// Function - classNames
export const classNames = (...args: any[]): string => {
	return args
		.filter((arg) => arg && typeof arg == 'string' && arg !== '')
		.join(' ');
};

/*---------- Array ----------*/

export const arShuffle = (array: any[]) => {
	return array
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value);
};
