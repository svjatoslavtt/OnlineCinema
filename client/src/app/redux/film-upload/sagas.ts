import { all, call, put, takeEvery } from "redux-saga/effects";
import { ApiEndPoints } from "../../routes/api-routes-const";
import { AppRoutes } from "../../routes/routes-const";
import { request } from "../../shared/hooks/request";
import { Actions, ActionTypes } from "./actions";

function* uploadFilm(action: any) {
	try {
		const history = { ...action.payload.history };
		yield call(request, ApiEndPoints.FILM_UPLOAD, 'POST', {...action.payload.film});
		yield put(Actions.uploadFilmSuccess());
		yield history.push(AppRoutes.MY_OFFICE);
	} catch (err) {
		yield put(Actions.uploadFilmFailed(err));
	}
};

export function* watchUploadFilm() {
	yield all([
		takeEvery(ActionTypes.UPLOAD_FILM_REQUEST, uploadFilm),
	]);
};