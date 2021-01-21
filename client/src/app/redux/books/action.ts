import { action, ActionType } from "typesafe-actions";

export enum ActionTypes {
	GET_BOOKS_REQUEST = 'GET_BOOKS_REQUEST',
	GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS',
	GET_BOOKS_FAILED = 'GET_BOOKS_FAILED',

	GET_DISCOUNT_BOOKS_REQUEST = 'GET_DISCOUNT_BOOKS_REQUEST',
	GET_DISCOUNT_BOOKS_SUCCESS = 'GET_DISCOUNT_BOOKS_SUCCESS',
	GET_DISCOUNT_BOOKS_FAILED = 'GET_DISCOUNT_BOOKS_FAILED',

	GET_MY_BOOKS_REQUEST = 'GET_MY_BOOKS_REQUEST',
	GET_MY_BOOKS_SUCCESS = 'GET_MY_BOOKS_SUCCESS',
	GET_MY_BOOKS_FAILED = 'GET_MY_BOOKS_FAILED',

	GET_MY_LIKES_REQUEST = 'GET_MY_LIKES_REQUEST',
	GET_MY_LIKES_SUCCESS = 'GET_MY_LIKES_SUCCESS',
	GET_MY_LIKES_FAILED = 'GET_MY_LIKES_FAILED',

	GET_CURRENT_BOOK_REQUEST = 'GET_CURRENT_BOOK_REQUEST',
	GET_CURRENT_BOOK_SUCCESS = 'GET_CURRENT_BOOK_SUCCESS',
	GET_CURRENT_BOOK_FAILED = 'GET_CURRENT_BOOK_FAILED',

	SAVE_BOOK_REQUEST = 'SAVE_BOOK_REQUEST',
	SAVE_BOOK_SUCCESS = 'SAVE_BOOK_SUCCESS',
	SAVE_BOOK_FAILED = 'SAVE_BOOK_FAILED',

	REMOVE_SAVED_BOOK_REQUEST = 'REMOVE_SAVED_BOOK_REQUEST',
	REMOVE_SAVED_BOOK_SUCCESS = 'REMOVE_SAVED_BOOK_SUCCESS',
	REMOVE_SAVED_BOOK_FAILED = 'REMOVE_SAVED_BOOK_FAILED',

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

	getDiscountBooksRequest: () => action(ActionTypes.GET_DISCOUNT_BOOKS_REQUEST),
	getDiscountBooksSuccess: (payload: any) => action(ActionTypes.GET_DISCOUNT_BOOKS_SUCCESS, payload),
	getDiscountBooksFailed: (payload: { message: string }) => action(ActionTypes.GET_DISCOUNT_BOOKS_FAILED, payload),

	getMyBooksRequest: () => action(ActionTypes.GET_MY_BOOKS_REQUEST),
	getMyBooksSuccess: (payload: any) => action(ActionTypes.GET_MY_BOOKS_SUCCESS, payload),
	getMyBooksFailed: (payload: { message: string }) => action(ActionTypes.GET_MY_BOOKS_FAILED, payload),

	getMyLikesRequest: () => action(ActionTypes.GET_MY_LIKES_REQUEST),
	getMyLikesSuccess: (payload: any) => action(ActionTypes.GET_MY_LIKES_SUCCESS, payload),
	getMyLikesFailed: (payload: { message: string }) => action(ActionTypes.GET_MY_LIKES_FAILED, payload),

	getCurrentBookRequest: (payload: { bookId: string }) => action(ActionTypes.GET_CURRENT_BOOK_REQUEST, payload),
	getCurrentBookSuccess: (payload: any) => action(ActionTypes.GET_CURRENT_BOOK_SUCCESS, payload),
	getCurrentBookFailed: (payload: { message: string }) => action(ActionTypes.GET_CURRENT_BOOK_FAILED, payload),

	saveBookRequest: (payload: { bookId: string }) => action(ActionTypes.SAVE_BOOK_REQUEST, payload), 
	saveBookSuccess: (payload: any) => action(ActionTypes.SAVE_BOOK_SUCCESS, payload), 
	saveBookFailed: (payload: { message: string }) => action(ActionTypes.SAVE_BOOK_FAILED, payload), 

	removeSavedBookRequest: (payload: { bookId: string }) => action(ActionTypes.REMOVE_SAVED_BOOK_REQUEST, payload), 
	removeSavedBookSuccess: (payload: any) => action(ActionTypes.REMOVE_SAVED_BOOK_SUCCESS, payload), 
	removeSavedBookFailed: (payload: { message: string }) => action(ActionTypes.REMOVE_SAVED_BOOK_FAILED, payload), 

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