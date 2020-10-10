import { createSelector } from "reselect";

import { FilterTypes } from "./reducer";

import { RootState } from "../store";

const getFilterState = (state: RootState) => state.filter;

export const getFilterIsOpen = createSelector(
	getFilterState,
	(state: FilterTypes) => state.filterIsOpen
);

export const getDirectors = createSelector(
	getFilterState,
	(state: FilterTypes) => state.directors
);

export const getFilterFilms = createSelector(
	getFilterState,
	(state: FilterTypes) => state.filterFilms
);