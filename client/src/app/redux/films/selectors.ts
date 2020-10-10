import { createSelector } from "reselect";

import { FilmsState } from "./types";

import { RootState } from "../store";

const getFilmsState = (state: RootState) => state.getFilms;

export const getFilms = createSelector(
	getFilmsState,
	(state: FilmsState) => state.films
);

export const getMyFilms = createSelector(
	getFilmsState,
	(state: FilmsState) => state.myFilms
);

export const getMyLikes = createSelector(
	getFilmsState,
	(state: FilmsState) => state.myLikes
);

export const getCurrentFilm = createSelector(
	getFilmsState,
	(state: FilmsState) => state.currentFilm
);

export const getIsLikeFilm = createSelector(
	getFilmsState,
	(state: FilmsState) => state.isLike
);

export const getIsRatedFilm = createSelector(
	getFilmsState,
	(state: FilmsState) => state.isRate
);