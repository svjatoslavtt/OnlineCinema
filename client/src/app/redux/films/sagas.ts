import { all, call, put, takeEvery } from "redux-saga/effects";
import { ApiEndPoints } from "../../routes/api-routes-const";

import { request } from "../../shared/hooks/request";
import { Actions, ActionTypes } from "./action";

function* getFilms() {
	try {
		const data = yield call(request, ApiEndPoints.GET_FILMS);
		yield put(Actions.getFilmsSuccess(data));
	} catch (err) {
		yield put(Actions.getFilmsFailed(err));
	}
};

function* getMyFilms() {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_MY_FILMS, 'POST', {userId});
		yield put(Actions.getMyFilmsSuccess(data));
	} catch (err) {
		yield put (Actions.getMyFilmsFailed(err));
	}
};

function* getMyLikes() {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_MY_LIKES_FILMS, 'POST', {userId});
		yield put(Actions.getMyLikesSuccess(data));
	} catch (err) {
		yield put (Actions.getMyLikesFailed(err));
	}
};

function* getCurrentFilm(action: any) {
	try {
		const filmId = action.payload.filmId;
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_CURRENT_FILM + '/' + filmId, 'POST', {userId});
		yield put(Actions.getCurrentFilmSuccess(data));
	} catch (err) {
		yield put(Actions.getCurrentFilmFailed(err));
	}
};

function* likeFilm(action: any) {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.LIKE_FILM + '/' + action.payload.filmId, 'POST', {userId}, {
			Authorization: `Bearer ${action.payload.token}`,
	});
		console.log(data);
		yield put(Actions.likeFilmSuccess(data)); 
	} catch (err) {
		yield put(Actions.likeFilmFailed(err));
	}
};

function* dislikeFilm(action: any) {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.DISLIKE_FILM + '/' + action.payload.filmId, 'POST', {userId}, {
			Authorization: `Bearer ${action.payload.token}`,
	});
		yield put(Actions.dislikeFilmSuccess(data)); 
	} catch (err) {
		yield put(Actions.dislikeFilmFailed(err.message));
	}
};

function* rateFilm(action: any) {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.RATE_FILM + '/' + action.payload.filmId, 'POST', 
		{
			userId, 
			rating: action.payload.rating
		}, {
			Authorization: `Bearer ${action.payload.token}`,
		});
		yield put(Actions.rateFilmSuccess(data));
	} catch (err) {
		yield put(Actions.rateFilmFailed(err));
	}
}

export function* watchGetFilms() {
	yield all([
		takeEvery(ActionTypes.GET_FILMS_REQUEST, getFilms),
		takeEvery(ActionTypes.GET_MY_FILMS_REQUEST, getMyFilms),
		takeEvery(ActionTypes.GET_MY_LIKES_REQUEST, getMyLikes),
		takeEvery(ActionTypes.GET_CURRENT_FILM_REQUEST, getCurrentFilm),
		takeEvery(ActionTypes.LIKE_FILM_REQUEST, likeFilm),
		takeEvery(ActionTypes.DISLIKE_FILM_REQUEST, dislikeFilm),
		takeEvery(ActionTypes.RATE_FILM_REQUEST, rateFilm),
	]);
};