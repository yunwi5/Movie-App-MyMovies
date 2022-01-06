// There are total 13 genres from Netflix.

export const GenreList = [
	"Anime",
	"Action & Adventures",
	"Science-Fiction & Fantasy",
	"Thriller",
	"TV Shows",
	"Romantic Movies",
	"Comedies",
	"Music & Musicals",
	"Drama",
	"Documentaries",
	"Children & Family Movies",
	"Horror",
	"Other"
];

export type genre =
	| "Anime"
	| "Drama"
	| "Thriller"
	| "Horror"
	| "Children & Family Movies"
	| "TV Shows"
	| "Romantic Movies"
	| "Comedies"
	| "Music & Musicals"
	| "Science-Fiction & Fantasy"
	| "Action & Adventures"
	| "Documentaries"
	| "Other";

export interface Comment {
	userName: string;
	commentText: string;
	dateString: string;
	rating: number;
}

// Movie interface
// More Properties can be added later on
export default interface Movie {
	id: string;
	title: string;
	rating: number;
	description: string;
	imgUrl: string;
	genreList: genre[];
	producer: string | null;
	duration: number | null;
	year: number | null;
	isFavorite: boolean;
	director: string | null;
	isFromStore: boolean;
	// New Feature!
	comments: Comment[];
	// UserMovie needs to have key, so that user can send DELETE request using the movie key.
	key?: string;
};

export class UserMovie {
	id: string;
	title: string;
	rating: number;
	description: string;
	imgUrl: string;
	genreList: genre[];
	producer: string | null;
	duration: number | null;
	year: number | null;
	isFavorite: boolean;
	director: string | null;
	isFromStore: boolean;
	key: string | null;
	comments: Comment[];

	constructor (movieObj: Movie) {
		this.id = movieObj.id;
		this.title = movieObj.title;
		this.rating = movieObj.rating;
		this.description = movieObj.description;
		this.imgUrl = movieObj.imgUrl;
		this.genreList = movieObj.genreList;
		this.producer = movieObj.producer;
		this.duration = movieObj.duration;
		this.year = movieObj.year;
		this.isFavorite = movieObj.isFavorite;
		this.director = movieObj.director;
		this.isFromStore = movieObj.isFromStore;
		this.key = movieObj.key ? movieObj.key : null;
		this.comments = movieObj.comments || [];
	}
}
