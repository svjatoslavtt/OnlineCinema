import { action, ActionType } from "typesafe-actions";

export enum ActionTypes {
	GET_FILMS_REQUEST = 'GET_FILMS_REQUEST',
	GET_FILMS_SUCCESS = 'GET_FILMS_SUCCESS',
	GET_FILMS_FAILED = 'GET_FILMS_FAILED',
};

export const Actions = {
	getFilmsRequest: () => action(ActionTypes.GET_FILMS_REQUEST),
	getFilmsSuccess: (payload: any) => action(ActionTypes.GET_FILMS_SUCCESS, payload),
	getFilmsFailed: (payload: { message: string }) => action(ActionTypes.GET_FILMS_FAILED, payload),
};

export type ActionTypesUnion = ActionType<typeof Actions>;