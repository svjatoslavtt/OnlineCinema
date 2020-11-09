import axios from 'axios';
import { all, call, put, takeEvery } from "redux-saga/effects";
import { ApiEndPoints } from "../../routes/api-routes-const";
import { AppRoutes } from "../../routes/routes-const";

import { request } from "../../shared/hooks/request";
import { Actions, ActionTypes } from "./action";

function* getFilms() {
	try {
		const data = yield call(request, ApiEndPoints.GET_FILMS);
		yield put(Actions.getBooksSuccess(data));
	} catch (err) {
		yield put(Actions.getBooksFailed(err));
	};
};

function* getMyFilms() {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_MY_FILMS, 'POST', {userId});
		yield put(Actions.getMyBooksSuccess(data));
	} catch (err) {
		yield put (Actions.getMyBooksFailed(err));
	};
};

function* getMyLikes() {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_MY_LIKES_FILMS, 'POST', {userId});
		yield put(Actions.getMyLikesSuccess(data));
	} catch (err) {
		yield put (Actions.getMyLikesFailed(err));
	};
};

function* getCurrentFilm(action: any) {
	try {
		const filmId = action.payload.filmId;
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.GET_CURRENT_FILM + '/' + filmId, 'POST', {userId});
		yield put(Actions.getCurrentBookSuccess(data));
	} catch (err) {
		yield put(Actions.getCurrentBookFailed(err));
	};
};

function* likeFilm(action: any) {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.LIKE_FILM + '/' + action.payload.filmId, 'POST', {userId}, {
			Authorization: `Bearer ${action.payload.token}`,
	});
		yield put(Actions.likeBookSuccess(data)); 
	} catch (err) {
		yield put(Actions.likeBookFailed(err));
	};
};

function* dislikeFilm(action: any) {
	try {
		const userId: string = yield JSON.parse(localStorage.getItem("id") as string);
		const data = yield call(request, ApiEndPoints.DISLIKE_FILM + '/' + action.payload.filmId, 'POST', {userId}, {
			Authorization: `Bearer ${action.payload.token}`,
	});
		yield put(Actions.dislikeBookSuccess(data)); 
	} catch (err) {
		yield put(Actions.dislikeBookFailed(err.message));
	};
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
		yield put(Actions.rateBookSuccess(data));
	} catch (err) {
		yield put(Actions.rateBookFailed(err));
	};
};

function* getCurrentPage(action: any) {
	try {
		const page = action.payload.page;
		const data = yield call(request, ApiEndPoints.PAGINATION, 'POST', {page});
		yield put(Actions.getCurrentPageSuccess(data));
	} catch (err) {
		yield put(Actions.getCurrentPageFailed(err));
	};
};

function* editFilm(action: any) {
	try {
		const history = { ...action.payload.history };
		yield call(axios.post, process.env.REACT_APP_API + ApiEndPoints.EDIT_FILM, action.payload.formData as FormData);
		yield history.push(AppRoutes.BOOK_DETAILED + '/' + action.payload.id);
	} catch (err) {
		yield put(Actions.editBookFailed(err));
	};
};

export function* watchGetFilms() {
	yield all([
		takeEvery(ActionTypes.GET_BOOKS_REQUEST, getFilms),
		takeEvery(ActionTypes.GET_MY_BOOKS_REQUEST, getMyFilms),
		takeEvery(ActionTypes.GET_MY_LIKES_REQUEST, getMyLikes),
		takeEvery(ActionTypes.GET_CURRENT_BOOK_REQUEST, getCurrentFilm),
		takeEvery(ActionTypes.LIKE_BOOK_REQUEST, likeFilm),
		takeEvery(ActionTypes.DISLIKE_BOOK_REQUEST, dislikeFilm),
		takeEvery(ActionTypes.RATE_BOOK_REQUEST, rateFilm),
		takeEvery(ActionTypes.GET_CURRENT_PAGE_REQUEST, getCurrentPage),
		takeEvery(ActionTypes.EDIT_BOOK_REQUEST, editFilm),
	]);
};