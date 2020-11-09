import { all, call, put, takeEvery } from "redux-saga/effects";
import axios from 'axios';

import { Actions, ActionTypes } from "./actions";

import { ApiEndPoints } from "../../routes/api-routes-const";
import { AppRoutes } from "../../routes/routes-const";

function* uploadFilm(action: any) {
	try {
		const history = { ...action.payload.history };
		yield call(axios.post, process.env.REACT_APP_API + ApiEndPoints.FILM_UPLOAD, action.payload.formData as FormData);
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