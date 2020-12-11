import { action, ActionType } from "typesafe-actions";

export enum ActionTypes {
	GET_BOOKS_REQUEST = 'GET_BOOKS_REQUEST',
	GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS',
	GET_BOOKS_FAILED = 'GET_BOOKS_FAILED',

	GET_MY_BOOKS_REQUEST = 'GET_MY_BOOKS_REQUEST',
	GET_MY_BOOKS_SUCCESS = 'GET_MY_BOOKS_SUCCESS',
	GET_MY_BOOKS_FAILED = 'GET_MY_BOOKS_FAILED',

	GET_MY_LIKES_REQUEST = 'GET_MY_LIKES_REQUEST',
	GET_MY_LIKES_SUCCESS = 'GET_MY_LIKES_SUCCESS',
	GET_MY_LIKES_FAILED = 'GET_MY_LIKES_FAILED',

	GET_CURRENT_BOOK_REQUEST = 'GET_CURRENT_BOOK_REQUEST',
	GET_CURRENT_BOOK_SUCCESS = 'GET_CURRENT_BOOK_SUCCESS',
	GET_CURRENT_BOOK_FAILED = 'GET_CURRENT_BOOK_FAILED',

	LIKE_BOOK_REQUEST = 'LIKE_BOOK_REQUEST',
	LIKE_BOOK_SUCCESS = 'LIKE_BOOK_SUCCESS',
	LIKE_BOOK_FAILED = 'LIKE_BOOK_FAILED',

	DISLIKE_BOOK_REQUEST = 'DISLIKE_BOOK_REQUEST',
	DISLIKE_BOOK_SUCCESS = 'DISLIKE_BOOK_SUCCESS',
	DISLIKE_BOOK_FAILED = 'DISLIKE_BOOK_FAILED',

	RATE_BOOK_REQUEST = 'RATE_BOOK_REQUEST',
	RATE_BOOK_SUCCESS = 'RATE_BOOK_SUCCESS',
	RATE_BOOK_FAILED = 'RATE_BOOK_FAILED',

	GET_CURRENT_PAGE_REQUEST = 'GET_CURRENT_PAGE_REQUEST',
	GET_CURRENT_PAGE_SUCCESS = 'GET_CURRENT_PAGE_SUCCESS',
	GET_CURRENT_PAGE_FAILED = 'GET_CURRENT_PAGE_FAILED',

	EDIT_BOOK_REQUEST = 'EDIT_BOOK_REQUEST',
	EDIT_BOOK_SUCESS = 'EDIT_BOOK_SUCCESS',
	EDIT_BOOK_FAILED = 'EDIT_BOOK_FAILED',

	UPLOAD_PAGE = 'UPLOAD_PAGE',
};

export const Actions = {
	getBooksRequest: () => action(ActionTypes.GET_BOOKS_REQUEST),
	getBooksSuccess: (payload: any) => action(ActionTypes.GET_BOOKS_SUCCESS, payload),
	getBooksFailed: (payload: { message: string }) => action(ActionTypes.GET_BOOKS_FAILED, payload),

	getMyBooksRequest: () => action(ActionTypes.GET_MY_BOOKS_REQUEST),
	getMyBooksSuccess: (payload: any) => action(ActionTypes.GET_MY_BOOKS_SUCCESS, payload),
	getMyBooksFailed: (payload: { message: string }) => action(ActionTypes.GET_MY_BOOKS_FAILED, payload),

	getMyLikesRequest: () => action(ActionTypes.GET_MY_LIKES_REQUEST),
	getMyLikesSuccess: (payload: any) => action(ActionTypes.GET_MY_LIKES_SUCCESS, payload),
	getMyLikesFailed: (payload: { message: string }) => action(ActionTypes.GET_MY_LIKES_FAILED, payload),

	getCurrentBookRequest: (payload: { bookId: string }) => action(ActionTypes.GET_CURRENT_BOOK_REQUEST, payload),
	getCurrentBookSuccess: (payload: any) => action(ActionTypes.GET_CURRENT_BOOK_SUCCESS, payload),
	getCurrentBookFailed: (payload: { message: string }) => action(ActionTypes.GET_CURRENT_BOOK_FAILED, payload),

	likeBookRequest: (payload: { bookId: string, token: string }) => action(ActionTypes.LIKE_BOOK_REQUEST, payload), 
	likeBookSuccess: (payload: any) => action(ActionTypes.LIKE_BOOK_SUCCESS, payload), 
	likeBookFailed: (payload: { message: string }) => action(ActionTypes.LIKE_BOOK_FAILED, payload), 

	dislikeBookRequest: (payload: { bookId: string, token: string }) => action(ActionTypes.DISLIKE_BOOK_REQUEST, payload), 
	dislikeBookSuccess: (payload: any) => action(ActionTypes.DISLIKE_BOOK_SUCCESS, payload), 
	dislikeBookFailed: (payload: { message: string }) => action(ActionTypes.DISLIKE_BOOK_FAILED, payload), 

	rateBookRequest: (payload: { bookId: string, rating: number | null, token: string }) => action(ActionTypes.RATE_BOOK_REQUEST, payload), 
	rateBookSuccess: (payload: any) => action(ActionTypes.RATE_BOOK_SUCCESS, payload), 
	rateBookFailed: (payload: { message: string }) => action(ActionTypes.RATE_BOOK_FAILED, payload),

	getCurrentPageRequest: (payload: { page: number }) => action(ActionTypes.GET_CURRENT_PAGE_REQUEST, payload),
	getCurrentPageSuccess: (payload: any) => action(ActionTypes.GET_CURRENT_PAGE_SUCCESS, payload),
	getCurrentPageFailed: (payload: { message: string }) => action(ActionTypes.GET_CURRENT_PAGE_FAILED, payload),

	editBookRequest: (payload: any) => action(ActionTypes.EDIT_BOOK_REQUEST, payload),
	editBookSuccess: (payload: any) => action(ActionTypes.EDIT_BOOK_SUCESS, payload),
	editBookFailed: (payload: { message: string }) => action(ActionTypes.EDIT_BOOK_FAILED, payload),

	uploadPage: () =>  action(ActionTypes.UPLOAD_PAGE),
};

export type ActionTypesUnion = ActionType<typeof Actions>;