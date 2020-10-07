import { ActionTypes, ActionTypesUnion } from "./action";

export type FilmTypes = {
	image: string;
	title: string;
	averageRating: number;
	id: string;
};

export type FilmsState = {
	films: FilmTypes[] | null;
	myFilms: FilmTypes[] | null;
	myLikes: FilmTypes[] | null;
	currentFilm: any | null;
	isLike: boolean;
	isRate: boolean;
};

export const filmsInitialState: FilmsState = {
	films: null,
	myFilms: null,
	myLikes: null,
	currentFilm: null,
	isLike: false,
	isRate: false,
};

export const reducer = (state = filmsInitialState, action: ActionTypesUnion) => {
	console.log(action);
	switch (action.type) {
		case ActionTypes.GET_FILMS_SUCCESS: 
			return {
				...state,
				films: [...action.payload.films],
			}
		case ActionTypes.GET_MY_FILMS_SUCCESS:
			return {
				...state,
				myFilms: [...action.payload.films],
			}	
		case ActionTypes.GET_MY_LIKES_SUCCESS:
			return {
				...state,
				myLikes: [...action.payload.films],
			}	
		case ActionTypes.GET_CURRENT_FILM_SUCCESS:
			return {
				...state,
				currentFilm: action.payload.currentFilm,
				isLike: action.payload.isLike,
				isRate: action.payload.isRate,
			}		
		case ActionTypes.LIKE_FILM_SUCCESS:
			return {
				...state,
				currentFilm: action.payload.film,
				isLike: action.payload.isLike,
			}	
		case ActionTypes.DISLIKE_FILM_SUCCESS:
			return {
				...state,
				currentFilm: action.payload.film,
				isLike: action.payload.isLike,
			}	
		case ActionTypes.RATE_FILM_SUCCESS:
			return {
				...state,
				currentFilm: action.payload.film,
				isRate: action.payload.isRate,
			}
		default: return state;	
	}
};