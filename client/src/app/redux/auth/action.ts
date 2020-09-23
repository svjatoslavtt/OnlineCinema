import { action, ActionType } from 'typesafe-actions';

import {Login, RegisterUser} from "../../shared/interfaces/auth.interface";

export enum ActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',

  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILED = 'REGISTER_FAILED',

  LOGOUT = 'LOGOUT',

  CLEAR_ERRORS = 'CLEAR_ERRORS',
}

export const Actions = {
  loginRequest: (payload: any) => action(ActionTypes.LOGIN_REQUEST, payload),
  loginSuccess: (payload: { token: string, user: any }) => action(ActionTypes.LOGIN_SUCCESS, payload),
  loginFailed: (payload: any) => action(ActionTypes.LOGIN_FAILED, payload),

  registerRequest: (payload: any) => action(ActionTypes.REGISTER_REQUEST, payload),
  registerSuccess: () => action(ActionTypes.REGISTER_SUCCESS),
  registerFailed: (payload: any) => action(ActionTypes.REGISTER_FAILED, payload),

  logout: () => action(ActionTypes.LOGOUT),

  clearErrors: () => action(ActionTypes.CLEAR_ERRORS),
}

export type ActionTypeUnion = ActionType<typeof Actions>;
