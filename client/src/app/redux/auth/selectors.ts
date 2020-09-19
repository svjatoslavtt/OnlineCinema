import { createSelector } from 'reselect';

import {RootState} from "../store";

const getAuthState = (state: RootState) => state.auth;

export const getAuthStateErrors = createSelector(
  getAuthState,
  (state) => state.errors
);