import { action, ActionType } from "typesafe-actions";

export enum ActionTypes {
	LOADING_START = 'LOADING_START',
	LOADING_STOP = 'LOADING_STOP',
};

export const Actions = {
	loadingStart: () => action(ActionTypes.LOADING_START),
	loadingStop: () => action(ActionTypes.LOADING_STOP),
};

export type ActionTypeUnion = ActionType<typeof Actions>;