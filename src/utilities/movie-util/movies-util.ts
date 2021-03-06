import Movie from '../../models/Movie';
import { Genre, ProductionCompany } from '../../models/Movie';
import { getGenreImgUrlStore } from '../../assets/movies-img';
import { getProducerLogo } from '../../utilities/design-util/logo-util';
import { Direction, ProcessedMovie, ScrapedMovie } from '../../models/helperModels';
import { mapGenres } from './genre-movie-util';

// Used in MoviesList
export const getCurrentPageMovies = (movies: Movie[], currentPage: number, perPage: number) => {
	const start_index = (currentPage - 1) * perPage;
	const end_index = start_index + perPage;
	const currentPageMovies = movies.slice(start_index, end_index);
	return currentPageMovies;
};

// Used in MoviesList
export const filterMovies = (movies: Movie[], searchWord: string | undefined) => {
	if (!searchWord) return movies;
	const newMovies = movies.filter((movie) =>
		movie.title.toLowerCase().includes(searchWord.toLowerCase()),
	);
	return newMovies;
};

// Used in MoviesForm
export const toDurationString = (totalMinutes: number | null) => {
	if (!totalMinutes) return '';
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const timeString = `${hours}h ${minutes}m`;
	return timeString;
};

// Helper function for sortMovies() at the moment
const compareMovies = (m1: Movie, m2: Movie, sortingStandard: string): number => {
	switch (sortingStandard) {
		case 'rating':
			if (m1.rating !== m2.rating) return m1.rating - m2.rating;
			break;
		case 'title':
			if (m1.title !== m2.title) return m1.title < m2.title ? -1 : 1;
			break;
		case 'year':
			if (m1.year && m2.year && m1.year !== m2.year) return m1.year - m2.year;
			break;
		default:
			return -1;
	}
	return -1;
};

// Used in MoviesList
function sortMovies (
	moviesList: Movie[],
	sortingStandard: string,
	dir: string | null = Direction.ASCENDING,
) {
	if (dir === Direction.ASCENDING) {
		moviesList.sort((movieA, movieB) => compareMovies(movieA, movieB, sortingStandard));
	} else {
		moviesList.sort((movieA, movieB) => compareMovies(movieB, movieA, sortingStandard));
	}
	return moviesList;
}

export default sortMovies;

// Create DUMMY MOVIES for starting users.
export function toUserMovies (dummyMovies: Movie[], moviesAmount: number) {
	let userMovies: Movie[] = [];
	for (let i = 0; i < dummyMovies.length; i++) {
		if (i >= moviesAmount) break;
		const m = dummyMovies[i];
		userMovies.push({ ...m, isFromStore: false });
	}
	return userMovies;
}

// Convert Movies Obj to Movies Array.
// Being used in movie-api.ts getUserBySearch and getUserById Fn.
export function toMoviesArray (movies: Object | Array<Movie>) {
	if (Array.isArray(movies)) return movies;

	let moviesArray: Movie[] = [];
	Object.entries(movies).forEach(([ key, value ]) => {
		moviesArray.push({ ...value, key, id: key });
	});

	return moviesArray;
}

// Reversely, convert Movies array to Movies object,
// where the key is movie.id, and the value is Movie obj.
export function toMoviesObject (movies: Movie[]) {
	const moviesObj: any = {};
	for (const m of movies) {
		const movieKey = m.key || m.id;
		moviesObj[movieKey] = m;
	}
	console.table('movies obj:', moviesObj);
	return moviesObj;
}

// Used In StorePage and SingleStorePage Components For
export function getMoviesAndUrlForGenre (genre: Genre, moviesList: Movie[]) {
	const imgUrl = getGenreImgUrlStore(genre);
	let resultMovies: Movie[] = [];

	if (genre === Genre.SCI_FICTION_FANTASY) {
		let genreName1 = Genre.SCI_FICTION_FANTASY;
		let genreName2 = 'Sci-Fiction & Fantasy';
		resultMovies = moviesList.filter(
			(movie) =>
				movie.genreList.includes(genreName1) ||
				movie.genreList.includes(genreName2 as Genre),
		);
	} else {
		resultMovies = moviesList.filter((movie) => movie.genreList.includes(genre));
	}

	return {
		imgUrl,
		movies: resultMovies,
		genre: genre,
	};
}

// Used in ProducerStorePage for getting movies, and logo of the producer.
export function getMoviesAndLogoOfProducer (producer: ProductionCompany, moviesList: Movie[]) {
	const filteredMovies = moviesList.filter(
		(m) => (m.producer ? m.producer.includes(producer) : false),
	);

	const logo = getProducerLogo(producer);
	return {
		movies: filteredMovies,
		producer: producer,
		logo,
	};
}

// Used In Movie Genre Section For Adding Store Movies To The Existing Single Genre Movies List.
// This Fn is used temporarily to add extra store movies as a placeholder.
// Our current store has only 17 movies, so in order to facilitate Horizontal Scroll functionality,
// Need to add some extra movies at the end of Single Genre List.
// If there are duplicates, the unique key rule is violated, so always make sure all items are unique.
export function concatUniqueMovies (moviesListA: Movie[], moviesListB: Movie[]) {
	let concatedMovies = [ ...moviesListA ];
	for (const m of moviesListB) {
		if (!concatedMovies.includes(m)) {
			concatedMovies.push(m);
		}
	}
	return concatedMovies;
}

// Get first 8~10 words for the movie description.
export function getShortMovieDescription (description: string, numWord: number = 10) {
	const introDescription = description.split(' ').slice(0, numWord);
	if (!introDescription[introDescription.length - 1].includes('.')) introDescription.push('...');
	return introDescription.join(' ');
}

// Process movie data fetched from google web scraping
export function processMovieData (data: ScrapedMovie): ProcessedMovie {
	const mappedGenres = mapGenres(data.genres || '');

	const { title, description } = data;

	return {
		title: title,
		description,
		year: data.year || 0,
		hours: data.hours || 0,
		minutes: data.minutes || 0,
		director: data.director || '',
		producers: data.producers || [ '' ],
		rating: data.rating || 0,
		genres: mappedGenres,
	};
}
