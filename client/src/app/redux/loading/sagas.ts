import { all, put, takeEvery } from "redux-saga/effects";

import { Actions } from "./actions";

import { ActionTypes as AuthActionTypes } from "../auth/actions";
import { ActionTypes as UploadFilmActionTypes } from "../book-upload/actions";
import { ActionTypes as FilmsActinTypes } from "../books/action";
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
			UploadFilmActionTypes.UPLOAD_FILM_REQUEST,
			FilmsActinTypes.GET_CURRENT_BOOK_REQUEST,
			FilmsActinTypes.GET_BOOKS_REQUEST,
			FilmsActinTypes.GET_MY_BOOKS_REQUEST,
			FilmsActinTypes.GET_MY_LIKES_REQUEST,
			FilmsActinTypes.GET_CURRENT_PAGE_REQUEST,
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
			UploadFilmActionTypes.UPLOAD_FILM_SUCCESS,
			UploadFilmActionTypes.UPLOAD_FILM_FAILED,
			FilmsActinTypes.GET_CURRENT_BOOK_SUCCESS,
			FilmsActinTypes.GET_CURRENT_BOOK_FAILED,
			FilmsActinTypes.GET_BOOKS_SUCCESS,
			FilmsActinTypes.GET_BOOKS_FAILED,
			FilmsActinTypes.GET_MY_BOOKS_SUCCESS,
			FilmsActinTypes.GET_MY_BOOKS_FAILED,
			FilmsActinTypes.GET_MY_LIKES_SUCCESS,
			FilmsActinTypes.GET_MY_LIKES_FAILED,
			FilmsActinTypes.GET_CURRENT_PAGE_SUCCESS,
			FilmsActinTypes.GET_CURRENT_PAGE_FAILED,
			UserProfileActinTypes.USER_PROFILE_FILMS_SUCCESS,
			UserProfileActinTypes.USER_PROFILE_FILMS_FAILED,
			UserProfileActinTypes.USER_PROFILE_LIKES_SUCCESS,
			UserProfileActinTypes.USER_PROFILE_LIKES_FAILED,
			FilterTypes.FILTER_SUCCESS,
			FilterTypes.FILTER_FAILED,
		], loadingStop)
	]);
};