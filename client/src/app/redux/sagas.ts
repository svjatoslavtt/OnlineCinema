import {watchAuthorization} from "./auth/sagas/auth.saga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([
    watchAuthorization(),
  ]);
}