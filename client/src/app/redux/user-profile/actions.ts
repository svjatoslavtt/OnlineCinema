import { action, ActionType } from "typesafe-actions";

export enum ActionTypes {
	USER_PROFILE_FILMS_REQUEST = 'USER_PROFILE_FILMS_REQUEST',
	USER_PROFILE_FILMS_SUCCESS = 'USER_PROFILE_FILMS_SUCCESS',
	USER_PROFILE_FILMS_FAILED = 'USER_PROFILE_FILMS_FAILED',

	USER_PROFILE_LIKES_REQUEST = 'USER_PROFILE_LIKES_REQUEST',
	USER_PROFILE_LIKES_SUCCESS = 'USER_PROFILE_LIKES_SUCCESS',
	USER_PROFILE_LIKES_FAILED = 'USER_PROFILE_LIKES_FAILED',
};

export const Actions = {
	getUserProfileBooksRequest: (payload: string) => action(ActionTypes.USER_PROFILE_FILMS_REQUEST, payload),
	getUserProfileBooksSuccess: (payload: any) => action(ActionTypes.USER_PROFILE_FILMS_SUCCESS, payload),
	getUserProfileBooksFailed: (payload: { message: string }) => action(ActionTypes.USER_PROFILE_FILMS_FAILED, payload),

	getUserProfileLikesRequest: (payload: string) => action(ActionTypes.USER_PROFILE_LIKES_REQUEST, payload),
	getUserProfileLikesSuccess: (payload: any) => action(ActionTypes.USER_PROFILE_LIKES_SUCCESS, payload),
	getUserProfileLikesFailed: (payload: { message: string }) => action(ActionTypes.USER_PROFILE_LIKES_FAILED, payload),
};

export type ActionTypesUnion = ActionType<typeof Actions>;