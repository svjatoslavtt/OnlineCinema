import { action, ActionType } from "typesafe-actions";

export enum ActionTypes {
	OPEN_FILTER = 'OPEN_FILTER',
	CLOSE_FILTER = 'CLOSE_FILTER',

	GET_DIRECTORS_REQUEST = 'GET_DERECTORS_REQUEST',
	GET_DIRECTORS_SUCCESS = 'GET_DERECTORS_SUCCESS',
	GET_DIRECTORS_FAILED = 'GET_DERECTORS_FAILED',

	FILTER_REQUEST = 'FILTER_REQUEST',
	FILTER_SUCCESS = 'FILTER_SUCCESS',
	FILTER_FAILED = 'FILTER_FAILED',

	RESET_FILTER = 'RESET_FILTER',
};

export const Actions = {
	openFilter: () => action(ActionTypes.OPEN_FILTER),
	closeFilter: () => action(ActionTypes.CLOSE_FILTER),

	getDirectorsRequest: () => action(ActionTypes.GET_DIRECTORS_REQUEST),
	getDirectorsSuccess: (payload: any) => action(ActionTypes.GET_DIRECTORS_SUCCESS, payload),
	getDirectorsFailed: (payload: { message: string }) => action(ActionTypes.GET_DIRECTORS_FAILED, payload),

	filterRequest: (payload: any) => action(ActionTypes.FILTER_REQUEST, payload),
	filterSuccess: (payload: any) => action(ActionTypes.FILTER_SUCCESS, payload),
	filterFailed: (payload: { message: string }) => action(ActionTypes.FILTER_FAILED, payload),

	resetFilter: () => action(ActionTypes.RESET_FILTER),
};

export type ActionTypesUnion = ActionType<typeof Actions>;