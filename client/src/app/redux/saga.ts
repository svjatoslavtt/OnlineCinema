import { all } from "redux-saga/effects";

import {watchAuthorization} from "./auth/sagas";
import { watchUploadFilm } from "./film-upload/sagas";
import { watchLoadingStart, watchLoadingStop } from "./loading/sagas";
import { watchGetFilms } from "./films/sagas";

export function* rootSaga() {
  yield all([
		watchAuthorization(),
		watchUploadFilm(),
		watchLoadingStart(),
		watchLoadingStop(),
		watchGetFilms(),
  ]);
}