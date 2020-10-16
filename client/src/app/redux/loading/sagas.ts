import { all, put, takeEvery } from "redux-saga/effects";

import { Actions } from "./actions";

import { ActionTypes as AuthActionTypes } from "../auth/actions";
import { ActionTypes as UploadFilmActionTypes } from "../film-upload/actions";
import { ActionTypes as FilmsActinTypes } from "../films/action";
import { ActionTypes as UserProfileActinTypes } from "../user-profile/actions";

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
			FilmsActinTypes.GET_CURRENT_FILM_REQUEST,
			FilmsActinTypes.GET_FILMS_REQUEST,
			FilmsActinTypes.GET_MY_FILMS_REQUEST,
			FilmsActinTypes.GET_MY_LIKES_REQUEST,
			FilmsActinTypes.GET_CURRENT_PAGE_REQUEST,
			UserProfileActinTypes.USER_PROFILE_FILMS_REQUEST,
			UserProfileActinTypes.USER_PROFILE_LIKES_REQUEST,
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
			FilmsActinTypes.GET_CURRENT_FILM_SUCCESS,
			FilmsActinTypes.GET_CURRENT_FILM_FAILED,
			FilmsActinTypes.GET_FILMS_SUCCESS,
			FilmsActinTypes.GET_FILMS_FAILED,
			FilmsActinTypes.GET_MY_FILMS_SUCCESS,
			FilmsActinTypes.GET_MY_FILMS_FAILED,
			FilmsActinTypes.GET_MY_LIKES_SUCCESS,
			FilmsActinTypes.GET_MY_LIKES_FAILED,
			FilmsActinTypes.GET_CURRENT_PAGE_SUCCESS,
			FilmsActinTypes.GET_CURRENT_PAGE_FAILED,
			UserProfileActinTypes.USER_PROFILE_FILMS_SUCCESS,
			UserProfileActinTypes.USER_PROFILE_FILMS_FAILED,
			UserProfileActinTypes.USER_PROFILE_LIKES_SUCCESS,
			UserProfileActinTypes.USER_PROFILE_LIKES_FAILED,
		], loadingStop)
	]);
};