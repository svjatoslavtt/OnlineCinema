import { all, put, takeEvery } from "redux-saga/effects";

import { Actions } from "./actions";

import { ActionTypes as AuthActionTypes } from "../auth/actions";
import { ActionTypes as UploadBookActionTypes } from "../book-upload/actions";
import { ActionTypes as BooksActinTypes } from "../books/action";
import { ActionTypes as UserProfileActinTypes } from "../user-profile/actions";
import { ActionTypes as FilterTypes } from "../filter/actions";

function* loadingStart() {
	yield put(Actions.loadingStart());
}

function* loadingStop() {
	yield put(Actions.loadingStop());
}

export function* watchLoadingStart() {
	yield all([
		takeEvery([
			AuthActionTypes.LOGIN_REQUEST,
			AuthActionTypes.REGISTER_REQUEST,
			UploadBookActionTypes.UPLOAD_FILM_REQUEST,
			BooksActinTypes.GET_CURRENT_BOOK_REQUEST,
			BooksActinTypes.GET_BOOKS_REQUEST,
			BooksActinTypes.GET_MY_BOOKS_REQUEST,
			BooksActinTypes.GET_MY_LIKES_REQUEST,
			BooksActinTypes.GET_CURRENT_PAGE_REQUEST,
			UserProfileActinTypes.USER_PROFILE_FILMS_REQUEST,
			UserProfileActinTypes.USER_PROFILE_LIKES_REQUEST,
			FilterTypes.FILTER_REQUEST,
		], loadingStart)
	]);
};

export function* watchLoadingStop() {
	yield all([
		takeEvery([
			AuthActionTypes.LOGIN_SUCCESS,
			AuthActionTypes.LOGIN_FAILED,
			AuthActionTypes.REGISTER_SUCCESS,
			AuthActionTypes.REGISTER_FAILED,
			UploadBookActionTypes.UPLOAD_FILM_SUCCESS,
			UploadBookActionTypes.UPLOAD_FILM_FAILED,
			BooksActinTypes.GET_CURRENT_BOOK_SUCCESS,
			BooksActinTypes.GET_CURRENT_BOOK_FAILED,
			BooksActinTypes.GET_BOOKS_SUCCESS,
			BooksActinTypes.GET_BOOKS_FAILED,
			BooksActinTypes.GET_MY_BOOKS_SUCCESS,
			BooksActinTypes.GET_MY_BOOKS_FAILED,
			BooksActinTypes.GET_MY_LIKES_SUCCESS,
			BooksActinTypes.GET_MY_LIKES_FAILED,
			BooksActinTypes.GET_CURRENT_PAGE_SUCCESS,
			BooksActinTypes.GET_CURRENT_PAGE_FAILED,
			UserProfileActinTypes.USER_PROFILE_FILMS_SUCCESS,
			UserProfileActinTypes.USER_PROFILE_FILMS_FAILED,
			UserProfileActinTypes.USER_PROFILE_LIKES_SUCCESS,
			UserProfileActinTypes.USER_PROFILE_LIKES_FAILED,
			FilterTypes.FILTER_SUCCESS,
			FilterTypes.FILTER_FAILED,
		], loadingStop)
	]);
};