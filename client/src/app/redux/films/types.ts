export type FilmTypes = {
	image: string;
	title: string;
	averageRating: number;
	id: string;
	owner: string;
	likes: number;
};

export type FilmOwnerTypes = {
	id: string;
	name: string;
};

export type UsersSetRating = {
	_id: string;
	rating: number;
	userId: string;
}

export type CurrentFilmTypes = {
	title: string;
	description: string;
	image: string;
	director: string;
	averageRating: number;
	likes: number;
	peopleRated: number;
	rating: number;
	owner: FilmOwnerTypes;
	ratingUsersId: UsersSetRating[];
	usersId: string[];
	_id: string;
};

export type FilmsState = {
	films: FilmTypes[] | null;
	myFilms: FilmTypes[] | null;
	myLikes: FilmTypes[] | null;
	currentFilm: CurrentFilmTypes | null;
	isLike: boolean;
	isRate: boolean;
	pageCount: number[] | null;
	pagination: any;
};