import { ActionTypes, ActionTypesUnion } from "./action";
import { FilmsState } from "./types";

export const filmsInitialState: FilmsState = {
	films: null,
	myFilms: null,
	myLikes: null,
	currentFilm: null,
	isLike: false,
	isRate: false,
	pageCount: null,
	pagination: null,
};

export const reducer = (state = filmsInitialState, action: ActionTypesUnion) => {
	switch (action.type) {
		case ActionTypes.GET_BOOKS_SUCCESS: 
			return {
				...state,
				films: [...action.payload.films],
			}
		case ActionTypes.GET_MY_BOOKS_SUCCESS:
			return {
				...state,
				myFilms: [...action.payload.films],
			}	
		case ActionTypes.GET_MY_LIKES_SUCCESS:
			return {
				...state,
				myLikes: [...action.payload.films],
			}	
		case ActionTypes.GET_CURRENT_BOOK_SUCCESS:
			return {
				...state,
				currentFilm: action.payload.currentFilm,
				isLike: action.payload.isLike,
				isRate: action.payload.isRate,
			}		
		case ActionTypes.LIKE_BOOK_SUCCESS:
			return {
				...state,
				currentFilm: {
					...state.currentFilm,
					likes: action.payload.likes,
				},
				isLike: action.payload.isLike,
			}	
		case ActionTypes.DISLIKE_BOOK_SUCCESS:
			return {
				...state,
				currentFilm: {
					...state.currentFilm,
					likes: action.payload.likes,
				},
				isLike: action.payload.isLike,
			}		
		case ActionTypes.RATE_BOOK_SUCCESS:
			return {
				...state,
				currentFilm: {
					...state.currentFilm,
					...action.payload.rating,
				},
				isRate: action.payload.isRate,
			}
		case ActionTypes.GET_CURRENT_PAGE_SUCCESS:
			return {
				...state,
				films: action.payload.films,
				pagination: action.payload.pagination,
			}
		case ActionTypes.UPLOAD_PAGE: 
			return {
				...state,
				currentFilm: null,
			}	
		default: return state;	
	}
};