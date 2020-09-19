import { call, put, all, takeEvery } from 'redux-saga/effects'

import {Actions, ActionTypes} from "./action";

import {ApiEndPoints} from "../../routes/api-routes-const";
import {request} from "../../shared/hooks/request";

import {AppRoutes, AuthRoutes} from "../../routes/routes-const";

function* register(action: any) {
  try {
    const history = { ...action.payload.history };
    yield call(request, ApiEndPoints.register, 'POST', { ...action.payload.form });
    yield put(Actions.registerSuccess());
    yield history.push(AuthRoutes.SIGN_IN);
  } catch (err) {
    yield put(Actions.registerFailed(err));
  }
}

function* login(action: any) {
  try {
    const history = { ...action.payload.history };
    const data = yield call(request, ApiEndPoints.login, 'POST', { ...action.payload.form });
    yield put(Actions.loginSuccess({ token: data.token, user: data.user }));
    yield localStorage.setItem('token', JSON.stringify({ token: data.token }));
    yield localStorage.setItem('id', JSON.stringify({ id: data.user._id }));
    yield history.push(AppRoutes.NEWS_FEED);
  } catch (err) {
    yield put(Actions.loginFailed(err));
  }
}

export function* watchAuthorization() {
  yield all([
    takeEvery(ActionTypes.REGISTER_REQUEST, register),
    takeEvery(ActionTypes.LOGIN_REQUEST, login),
  ]);
}