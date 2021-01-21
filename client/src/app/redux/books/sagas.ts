import axios from 'axios';
import { all, call, put, takeEvery } from "redux-saga/effects";

import { Actions, ActionTypes } from "./action";
import { Book } from './types';

import { ApiEndPoints } from "../../routes/api-routes-const";
import { AppRoutes } from "../../routes/routes-const";
import { request } from "../../shared/utils/request";

function* getBooks() {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_FILMS + `${userId ? '?userId=' + userId : '' }`);
		yield put(Actions.getBooksSuccess(data));
	} catch (err) {
		yield put(Actions.getBooksFailed(err));
	};
};

function* getDiscountBooks() {
	try {
		const data = yield call(request, ApiEndPoints.GET_DISCOUNT_BOOKS);
		yield put(Actions.getDiscountBooksSuccess(data));
	} catch (err) {
		yield put(Actions.getDiscountBooksFailed(err));
	};
};

function* getMyBooks() {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_MY_FILMS, 'POST', {userId});
		yield put(Actions.getMyBooksSuccess(data));
	} catch (err) {
		yield put (Actions.getMyBooksFailed(err));
	};
};

function* getMyLikes() {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_MY_LIKES_FILMS, 'POST', {userId});
		yield put(Actions.getMyLikesSuccess(data));
	} catch (err) {
		yield put (Actions.getMyLikesFailed(err));
	};
};

function* getCurrentBook(action: any) {
	try {
		const bookId = action.payload.bookId;
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_CURRENT_FILM + '/' + bookId, 'POST', {userId});
		yield put(Actions.getCurrentBookSuccess(data));
	} catch (err) {
		yield put(Actions.getCurrentBookFailed(err));
	};
};

function* saveBook(action: any) {
	try {
		const userId: string = JSON.parse(localStorage.getItem('id') as string);
		const token: string = JSON.parse(localStorage.getItem('token') as string);
		const { bookId } = action.payload;

		yield call(request, ApiEndPoints.SAVE_BOOK + '/' + bookId, 'POST', {userId, bookId}, {
			Authorization: `Bearer ${token}`,
		});

		// yield put(Actions.saveBookSuccess(data)); 
	} catch (err) {
		yield put(Actions.saveBookFailed(err));
	};
};

function* removeSavedBook(action: any) {
	try {
		const userId: string = JSON.parse(localStorage.getItem('id') as string);
		const token: string = JSON.parse(localStorage.getItem('token') as string);
		const { bookId } = action.payload;

		yield call(request, ApiEndPoints.REMOVE_SAVED_BOOK + '/' + bookId, 'POST', {userId, bookId}, {
			Authorization: `Bearer ${token}`,
		});
		
		// yield put(Actions.removeSavedBookSuccess(data)); 
	} catch (err) {
		yield put(Actions.removeSavedBookFailed(err.message));
	};
};

function* rateBook(action: any) {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.RATE_FILM + '/' + action.payload.bookId, 'POST', 
		{
			userId, 
			rating: action.payload.rating
		}, {
			Authorization: `Bearer ${action.payload.token}`,
		});
		yield put(Actions.rateBookSuccess(data));
	} catch (err) {
		yield put(Actions.rateBookFailed(err));
	};
};

function* getCurrentPage(action: any) {
	try {
		const page = action.payload.page;
		const data = yield call(request, ApiEndPoints.PAGINATION, 'POST', {page});
		yield put(Actions.getCurrentPageSuccess(data));
	} catch (err) {
		yield put(Actions.getCurrentPageFailed(err));
	};
};

function* editBook(action: any) {
	try {
		const history = { ...action.payload.history };
		yield call(axios.post, process.env.REACT_APP_API + ApiEndPoints.EDIT_FILM, action.payload.formData as FormData);
		yield history.push(AppRoutes.BOOK_DETAILED + '/' + action.payload.id);
	} catch (err) {
		yield put(Actions.editBookFailed(err));
	};
};

export function* watchGetBooks() {
	yield all([
		takeEvery(ActionTypes.GET_BOOKS_REQUEST, getBooks),
		takeEvery(ActionTypes.GET_DISCOUNT_BOOKS_REQUEST, getDiscountBooks),
		takeEvery(ActionTypes.GET_MY_BOOKS_REQUEST, getMyBooks),
		takeEvery(ActionTypes.GET_MY_LIKES_REQUEST, getMyLikes),
		takeEvery(ActionTypes.GET_CURRENT_BOOK_REQUEST, getCurrentBook),
		takeEvery(ActionTypes.SAVE_BOOK_REQUEST, saveBook),
		takeEvery(ActionTypes.REMOVE_SAVED_BOOK_REQUEST, removeSavedBook),
		takeEvery(ActionTypes.RATE_BOOK_REQUEST, rateBook),
		takeEvery(ActionTypes.GET_CURRENT_PAGE_REQUEST, getCurrentPage),
		takeEvery(ActionTypes.EDIT_BOOK_REQUEST, editBook),
	]);
};