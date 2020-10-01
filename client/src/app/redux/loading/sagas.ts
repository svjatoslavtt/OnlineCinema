import { all, put, takeEvery } from "redux-saga/effects";

import { Actions } from "./actions";

import { ActionTypes as AuthActionTypes } from "../auth/actions";
import { ActionTypes as FilmActionTypes } from "../film-upload/actions";

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
			FilmActionTypes.UPLOAD_FILM_REQUEST,
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
			FilmActionTypes.UPLOAD_FILM_SUCCESS,
			FilmActionTypes.UPLOAD_FILM_FAILED,
		], loadingStop)
	]);
};