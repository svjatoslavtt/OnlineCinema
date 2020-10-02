import { createSelector } from "reselect";

import { FilmsState } from "./reducer";

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

export const getCurrentFilm = createSelector(
	getFilmsState,
	(state: FilmsState) => state.currentFilm
);