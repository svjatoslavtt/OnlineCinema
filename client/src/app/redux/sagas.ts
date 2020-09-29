import {watchAuthorization} from "./auth/saga";
import { all } from "redux-saga/effects";
import { watchUploadFilm } from "./film-upload/saga";
import { watchLoadingStart, watchLoadingStop } from "./loading/saga";

export function* rootSaga() {
  yield all([
		watchAuthorization(),
		watchUploadFilm(),
		watchLoadingStart(),
		watchLoadingStop(),
  ]);
}