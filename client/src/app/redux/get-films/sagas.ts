import { all, call, put, takeEvery } from "redux-saga/effects";
import { action } from "typesafe-actions";
import { ApiEndPoints } from "../../routes/api-routes-const";

import { request } from "../../shared/hooks/request";
import { Actions, ActionTypes } from "./action";

function* getFilms() {
	try {
		const data = yield call(request, ApiEndPoints.GET_FILMS);
		yield put(Actions.getFilmsSuccess(data));
	} catch (err) {
		yield put(Actions.getFilmsFailed(err));
	}
};

function* getMyFilms() {
	try {
		const id: { id: string } = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_MY_FILMS, 'POST', id);
		yield put(Actions.getMyFilmsSuccess(data));
	} catch (err) {
		yield put (Actions.getMyFilmsFailed(err));
	}
}

function* getCurrentFilm(action: any) {
	try {
		const id = action.payload.id;
		const data = yield call(request, ApiEndPoints.GET_CURRENT_FILM + '/' + id);
		yield put(Actions.getCurrentFilmSuccess(data));
	} catch (err) {
		yield put(Actions.getCurrentFilmFailed(err));
	}
}

export function* watchGetFilms() {
	yield all([
		takeEvery(ActionTypes.GET_FILMS_REQUEST, getFilms),
		takeEvery(ActionTypes.GET_MY_FILMS_REQUEST, getMyFilms),
		takeEvery(ActionTypes.GET_CURRENT_FILM_REQUEST, getCurrentFilm),
	]);
};