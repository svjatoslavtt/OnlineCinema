import { call, put, all, takeEvery } from 'redux-saga/effects'

import {Actions, ActionTypes} from "./actions";

import {ApiEndPoints} from "../../routes/api-routes-const";
import {request} from "../../shared/utils/request";

import {AppRoutes, AuthRoutes} from "../../routes/routes-const";
import { LoginInputs } from '../../shared/types/auth.types';

function* login(action: any) {
  try {
    const history = { ...action.payload.history };
    const form: LoginInputs = { ...action.payload.form };
    const data = yield call(request, ApiEndPoints.LOGIN, 'POST', form);
    yield put(Actions.loginSuccess({ token: data.token, user: data.user }));
    yield localStorage.setItem('token', JSON.stringify(data.token));
    yield localStorage.setItem('id', JSON.stringify(data.user._id));
		yield history.push(AppRoutes.NEWS_FEED);
  } catch (err) {
    yield put(Actions.loginFailed(err));
  }
};

function* register(action: any) {
  try {
    const history = { ...action.payload.history };
    yield call(request, ApiEndPoints.REGISTER, 'POST', { ...action.payload.form });
    yield put(Actions.registerSuccess());
    yield history.push(AuthRoutes.SIGN_IN);
  } catch (err) {
    yield put(Actions.registerFailed(err));
  }
};

export function* watchAuthorization() {
  yield all([
    takeEvery(ActionTypes.REGISTER_REQUEST, register),
    takeEvery(ActionTypes.LOGIN_REQUEST, login),
  ]);
};