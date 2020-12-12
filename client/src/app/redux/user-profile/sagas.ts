import { call, put, takeEvery, all } from "redux-saga/effects";
import { ApiEndPoints } from "../../routes/api-routes-const";
import { request } from "../../shared/utils/request";
import { Actions, ActionTypes } from "./actions";

function* getUserProfileBooks(action: any) {
	try {
		const data = yield call(request, ApiEndPoints.USER_PROFILE_FILMS + '/' + action.payload);
		yield put(Actions.getUserProfileBooksSuccess(data));
	} catch (err) {
		yield put(Actions.getUserProfileBooksFailed(err));
	};
};

function* getUserProfileLikes(action: any) {
	try {
		const data = yield call(request, ApiEndPoints.USER_PROFILE_LIKES + '/' + action.payload);
		yield put(Actions.getUserProfileLikesSuccess(data));
	} catch (err) {
		yield put(Actions.getUserProfileLikesFailed(err));
	};
};

export function* watchUserProfile() {
	yield all([
		takeEvery(ActionTypes.USER_PROFILE_FILMS_REQUEST, getUserProfileBooks),
		takeEvery(ActionTypes.USER_PROFILE_LIKES_REQUEST, getUserProfileLikes),
	]);
};