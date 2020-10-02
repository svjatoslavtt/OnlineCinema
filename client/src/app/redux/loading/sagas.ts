import { all, put, takeEvery } from "redux-saga/effects";

import { Actions } from "./actions";

import { ActionTypes as AuthActionTypes } from "../auth/actions";
import { ActionTypes as UploadFilmActionTypes } from "../film-upload/actions";
import { ActionTypes as FilmsActinTyoes } from "../films/action";

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
			FilmsActinTyoes.GET_CURRENT_FILM_REQUEST,
			FilmsActinTyoes.GET_FILMS_REQUEST,
			FilmsActinTyoes.GET_MY_FILMS_REQUEST,
			FilmsActinTyoes.GET_MY_LIKES_REQUEST,
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
			FilmsActinTyoes.GET_CURRENT_FILM_SUCCESS,
			FilmsActinTyoes.GET_CURRENT_FILM_FAILED,
			FilmsActinTyoes.GET_FILMS_SUCCESS,
			FilmsActinTyoes.GET_FILMS_FAILED,
			FilmsActinTyoes.GET_MY_FILMS_SUCCESS,
			FilmsActinTyoes.GET_MY_FILMS_FAILED,
			FilmsActinTyoes.GET_MY_LIKES_SUCCESS,
			FilmsActinTyoes.GET_MY_LIKES_FAILED,
		], loadingStop)
	]);
};