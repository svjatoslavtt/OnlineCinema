import { createSelector } from 'reselect';

import {RootState} from "../store";

const getAuthState = (state: RootState) => state.auth;

export const getAuthErrors = createSelector(
  getAuthState,
  (state) => state.errors
);

export const getAuthToken = createSelector(
  getAuthState,
  (state) => state.token
);

export const getAuthLoading = createSelector(
  getAuthState,
  (state) => state.loading
);