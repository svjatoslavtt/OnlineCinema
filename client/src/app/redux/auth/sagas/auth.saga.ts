import { call, put, all, takeEvery } from 'redux-saga/effects'

import {Actions, ActionTypes} from "../action";

import {ApiEndPoints} from "../../../routes/api-routes-const";
import {request} from "../../../shared/hooks/request";

import {AuthRoutes} from "../../../routes/routes-const";

function* register(action: any) {
  try {
    const history = { ...action.payload.history };
    const data = yield call(request, ApiEndPoints.register, 'POST', { ...action.payload.form });
    if (data.errors) {
      yield put(Actions.registerFailed(data.errors));
    } else {
      yield history.push(AuthRoutes.SIGN_IN);
    }
  } catch (err) {
    yield put(Actions.registerFailed(err));
  }
}

export function* watchAuthorization() {
  yield all([
    takeEvery(ActionTypes.REGISTER_REQUEST, register),
  ]);
}