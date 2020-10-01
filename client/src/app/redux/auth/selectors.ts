import { createSelector } from 'reselect';

import { AuthState } from './reducer';

import {RootState} from "../store";

const getAuthState = (state: RootState) => state.auth;

export const getAuthErrors = createSelector(
  getAuthState,
  (state: AuthState) => state.errors
);

export const getAuthToken = createSelector(
  getAuthState,
  (state: AuthState) => state.token
);