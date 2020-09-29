import { createSelector } from "reselect";
import { RootState } from "../store";

import { LoadingState } from "./reducer";

const getLoadingState = (state: RootState) => state.loading;

export const getLoading = createSelector(
	getLoadingState,
	(state: LoadingState) => state.loading
);