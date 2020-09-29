import { createSelector } from 'reselect';

import { AuthInterface } from './reducer';

import {RootState} from "../store";

const getAuthState = (state: RootState) => state.auth;

export const getAuthErrors = createSelector(
  getAuthState,
  (state: AuthInterface) => state.errors
);

export const getAuthToken = createSelector(
  getAuthState,
  (state: AuthInterface) => state.token
);