import { all } from "redux-saga/effects";

import {watchAuthorization} from "./auth/sagas";
import { watchUploadBook } from "./book-upload/sagas";
import { watchLoadingStart, watchLoadingStop } from "./loading/sagas";
import { watchGetBooks } from "./books/sagas";
import { watchUserProfile } from "./user-profile/sagas";
import { watchFilter } from "./filter/sagas";

export function* rootSaga() {
  yield all([
		watchAuthorization(),
		watchUploadBook(),
		watchLoadingStart(),
		watchLoadingStop(),
		watchGetBooks(),
		watchUserProfile(),
		watchFilter(),
  ]);
}