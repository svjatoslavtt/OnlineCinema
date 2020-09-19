import { call, put, all, takeEvery } from 'redux-saga/effects'

import {Actions, ActionTypes} from "../action";

import {ApiEndPoints} from "../../../routes/api-routes-const";
import {request} from "../../../shared/hooks/request";

import {AppRoutes, AuthRoutes} from "../../../routes/routes-const";

function* register(action: any) {
  try {
    const history = { ...action.payload.history };
    const data = yield call(request, ApiEndPoints.register, 'POST', { ...action.payload.form });
    if (data.errors) {
      yield put(Actions.registerFailed(data.errors));
    } else {
      yield history.push(AuthRoutes.SIGN_IN);
    }
  } catch (err) {}
}

function* login(action: any) {
  try {
    const history = { ...action.payload.history };
    const data = yield call(request, ApiEndPoints.login, 'POST', { ...action.payload.form });
    if (data.errors) {
      yield put(Actions.loginFailed(data.errors));
    } else {
      console.log(data);
      // yield put(Actions.loginSuccess(data.body));
      yield history.push(AppRoutes.NEWS_FEED);
    }
  } catch (err) {}
}

export function* watchAuthorization() {
  yield all([
    takeEvery(ActionTypes.REGISTER_REQUEST, register),
    takeEvery(ActionTypes.LOGIN_REQUEST, login),
  ]);
}