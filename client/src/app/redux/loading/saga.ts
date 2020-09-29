import { all, put, takeEvery } from "redux-saga/effects";

import { Actions } from "./action";

import { ActionTypes as AuthActionTypes } from "../auth/action";
import { ActionTypes as FilmActionTypes } from "../film-upload/action";

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