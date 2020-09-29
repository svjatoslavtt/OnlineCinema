import {watchAuthorization} from "./auth/sagas";
import { all } from "redux-saga/effects";
import { watchUploadFilm } from "./film-upload/sagas";
import { watchLoadingStart, watchLoadingStop } from "./loading/sagas";

export function* rootSaga() {
  yield all([
		watchAuthorization(),
		watchUploadFilm(),
		watchLoadingStart(),
		watchLoadingStop(),
  ]);
}