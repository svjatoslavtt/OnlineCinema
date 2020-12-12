import { action, ActionType } from 'typesafe-actions';

import { BookUploadRequest } from '../../shared/types/book-upload.types';

export enum ActionTypes {
	UPLOAD_FILM_REQUEST = 'UPLOAD_FILM_REQUEST',
	UPLOAD_FILM_SUCCESS = 'UPLOAD_FILM_SUCCESS',
	UPLOAD_FILM_FAILED = 'UPLOAD_FILM_FAILED',
};

export const Actions = {
	uploadBookRequest: (payload: BookUploadRequest) => action(ActionTypes.UPLOAD_FILM_REQUEST, payload),
	uploadBookSuccess: (payload: { message: string }) => action(ActionTypes.UPLOAD_FILM_SUCCESS, payload),
	uploadBookFailed: (payload: { message: string }) => action(ActionTypes.UPLOAD_FILM_FAILED, payload),
};

export type ActionTypeUnion = ActionType<typeof Actions>;