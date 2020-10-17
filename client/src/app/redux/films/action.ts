import { action, ActionType } from "typesafe-actions";

export enum ActionTypes {
	GET_FILMS_REQUEST = 'GET_FILMS_REQUEST',
	GET_FILMS_SUCCESS = 'GET_FILMS_SUCCESS',
	GET_FILMS_FAILED = 'GET_FILMS_FAILED',

	GET_MY_FILMS_REQUEST = 'GET_MY_FILMS_REQUEST',
	GET_MY_FILMS_SUCCESS = 'GET_MY_FILMS_SUCCESS',
	GET_MY_FILMS_FAILED = 'GET_MY_FILMS_FAILED',

	GET_MY_LIKES_REQUEST = 'GET_MY_LIKES_REQUEST',
	GET_MY_LIKES_SUCCESS = 'GET_MY_LIKES_SUCCESS',
	GET_MY_LIKES_FAILED = 'GET_MY_LIKES_FAILED',

	GET_CURRENT_FILM_REQUEST = 'GET_CURRENT_FILM_REQUEST',
	GET_CURRENT_FILM_SUCCESS = 'GET_CURRENT_FILM_SUCCESS',
	GET_CURRENT_FILM_FAILED = 'GET_CURRENT_FILM_FAILED',

	LIKE_FILM_REQUEST = 'LIKE_FILM_REQUEST',
	LIKE_FILM_SUCCESS = 'LIKE_FILM_SUCCESS',
	LIKE_FILM_FAILED = 'LIKE_FILM_FAILED',

	DISLIKE_FILM_REQUEST = 'DISLIKE_FILM_REQUEST',
	DISLIKE_FILM_SUCCESS = 'DISLIKE_FILM_SUCCESS',
	DISLIKE_FILM_FAILED = 'DISLIKE_FILM_FAILED',

	RATE_FILM_REQUEST = 'RATE_FILM_REQUEST',
	RATE_FILM_SUCCESS = 'RATE_FILM_SUCCESS',
	RATE_FILM_FAILED = 'RATE_FILM_FAILED',

	GET_CURRENT_PAGE_REQUEST = 'GET_CURRENT_PAGE_REQUEST',
	GET_CURRENT_PAGE_SUCCESS = 'GET_CURRENT_PAGE_SUCCESS',
	GET_CURRENT_PAGE_FAILED = 'GET_CURRENT_PAGE_FAILED',

	EDIT_FILM_REQUEST = 'EDIT_FILM_REQUEST',
	EDIT_FILM_SUCESS = 'EDIT_FILM_SUCCESS',
	EDIT_FILM_FAILED = 'EDIT_FILM_FAILED',
};

export const Actions = {
	getFilmsRequest: () => action(ActionTypes.GET_FILMS_REQUEST),
	getFilmsSuccess: (payload: any) => action(ActionTypes.GET_FILMS_SUCCESS, payload),
	getFilmsFailed: (payload: { message: string }) => action(ActionTypes.GET_FILMS_FAILED, payload),

	getMyFilmsRequest: () => action(ActionTypes.GET_MY_FILMS_REQUEST),
	getMyFilmsSuccess: (payload: any) => action(ActionTypes.GET_MY_FILMS_SUCCESS, payload),
	getMyFilmsFailed: (payload: { message: string }) => action(ActionTypes.GET_MY_FILMS_FAILED, payload),

	getMyLikesRequest: () => action(ActionTypes.GET_MY_LIKES_REQUEST),
	getMyLikesSuccess: (payload: any) => action(ActionTypes.GET_MY_LIKES_SUCCESS, payload),
	getMyLikesFailed: (payload: { message: string }) => action(ActionTypes.GET_MY_LIKES_FAILED, payload),

	getCurrentFilmRequest: (payload: { filmId: string }) => action(ActionTypes.GET_CURRENT_FILM_REQUEST, payload),
	getCurrentFilmSuccess: (payload: any) => action(ActionTypes.GET_CURRENT_FILM_SUCCESS, payload),
	getCurrentFilmFailed: (payload: { message: string }) => action(ActionTypes.GET_CURRENT_FILM_FAILED, payload),

	likeFilmRequest: (payload: { filmId: string, token: string }) => action(ActionTypes.LIKE_FILM_REQUEST, payload), 
	likeFilmSuccess: (payload: any) => action(ActionTypes.LIKE_FILM_SUCCESS, payload), 
	likeFilmFailed: (payload: { message: string }) => action(ActionTypes.LIKE_FILM_FAILED, payload), 

	dislikeFilmRequest: (payload: { filmId: string, token: string }) => action(ActionTypes.DISLIKE_FILM_REQUEST, payload), 
	dislikeFilmSuccess: (payload: any) => action(ActionTypes.DISLIKE_FILM_SUCCESS, payload), 
	dislikeFilmFailed: (payload: { message: string }) => action(ActionTypes.DISLIKE_FILM_FAILED, payload), 

	rateFilmRequest: (payload: { filmId: string, rating: number | null, token: string }) => action(ActionTypes.RATE_FILM_REQUEST, payload), 
	rateFilmSuccess: (payload: any) => action(ActionTypes.RATE_FILM_SUCCESS, payload), 
	rateFilmFailed: (payload: { message: string }) => action(ActionTypes.RATE_FILM_FAILED, payload),

	getCurrentPageRequest: (payload: { page: number }) => action(ActionTypes.GET_CURRENT_PAGE_REQUEST, payload),
	getCurrentPageSuccess: (payload: any) => action(ActionTypes.GET_CURRENT_PAGE_SUCCESS, payload),
	getCurrentPageFailed: (payload: { message: string }) => action(ActionTypes.GET_CURRENT_PAGE_FAILED, payload),

	editFilmRequest: (payload: any) => action(ActionTypes.EDIT_FILM_REQUEST, payload),
	editFilmSuccess: (payload: any) => action(ActionTypes.EDIT_FILM_SUCESS, payload),
	editFilmFailed: (payload: { message: string }) => action(ActionTypes.EDIT_FILM_FAILED, payload),
};

export type ActionTypesUnion = ActionType<typeof Actions>;