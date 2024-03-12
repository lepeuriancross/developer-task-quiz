// Types: Globals
/*----------------------------------------------------------------------------------------------------*/

/*---------- Authentication ----------*/

export type User = {
	name: string;
	email: string;
	highScore?: number;
};

/*---------- Game ----------*/

export type GameData = {
	artist: string;
	albums: Album[];
};

export type Album = {
	name: string;
	year_released: number;
	tracks: number;
	length: string;
	cover_image_path: string;
	cover_image_id: number;
	options: string[];
};
