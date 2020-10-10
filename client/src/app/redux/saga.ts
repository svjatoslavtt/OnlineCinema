import { all } from "redux-saga/effects";

import {watchAuthorization} from "./auth/sagas";
import { watchUploadFilm } from "./film-upload/sagas";
import { watchLoadingStart, watchLoadingStop } from "./loading/sagas";
import { watchGetFilms } from "./films/sagas";
import { watchUserProfile } from "./user-profile/sagas";
import { watchFilter } from "./filter/sagas";

export function* rootSaga() {
  yield all([
		watchAuthorization(),
		watchUploadFilm(),
		watchLoadingStart(),
		watchLoadingStop(),
		watchGetFilms(),
		watchUserProfile(),
		watchFilter(),
  ]);
}