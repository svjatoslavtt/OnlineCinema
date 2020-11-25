import { all, call, put, takeEvery } from "redux-saga/effects";
import { ApiEndPoints } from "../../routes/api-routes-const";
import { request } from "../../shared/utils/request";
import { Actions, ActionTypes } from "./actions";

function* getDirectors() {
	try {
		const directors = yield call(request, ApiEndPoints.GET_DIRECTORS);
		yield put(Actions.getDirectorsSuccess(directors));
	} catch (err) {
		yield put(Actions.getDirectorsFailed(err));
	};
};

function* filter(action: any) {
	try {
		const data = yield call(request, ApiEndPoints.FILTER, 'POST', action.payload);
		yield put(Actions.filterSuccess(data));
	} catch (err) {
		yield put(Actions.filterFailed(err));
	}
}

export function* watchFilter() {
	yield all([
		takeEvery(ActionTypes.GET_DIRECTORS_REQUEST, getDirectors),
		takeEvery(ActionTypes.FILTER_REQUEST, filter),
	]);
};