import { all, call, put, takeEvery } from "redux-saga/effects";
import { ApiEndPoints } from "../../routes/api-routes-const";

import { request } from "../../shared/hooks/request";
import { Actions, ActionTypes } from "./action";

function* getFilms() {
	try {
		const data = yield call(request, ApiEndPoints.GET_FILMS);
		console.log('data', data);
		yield put(Actions.getFilmsSuccess(data));
	} catch (err) {
		yield put(Actions.getFilmsFailed(err));
	}
};

export function* watchGetFilms() {
	yield all([
		takeEvery(ActionTypes.GET_FILMS_REQUEST, getFilms),
	]);
};