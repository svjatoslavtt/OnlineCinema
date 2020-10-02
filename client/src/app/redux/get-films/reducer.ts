import { ActionTypes, ActionTypesUnion } from "./action";

export type FilmTypes = {
	image: string;
	title: string;
	rating: number;
	id: string;
};

export type FilmsState = {
	films: FilmTypes[] | null;
	myFilms: FilmTypes[] | null;
	currentFilm: any | null;
};

export const filmsInitialState: FilmsState = {
	films: null,
	myFilms: null,
	currentFilm: null,
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
		case ActionTypes.GET_CURRENT_FILM_SUCCESS:
			return {
				...state,
				currentFilm: action.payload.currentFilm,
			}	
		default: return state;	
	}
};