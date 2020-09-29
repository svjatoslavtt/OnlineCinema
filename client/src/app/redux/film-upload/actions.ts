import { action, ActionType } from 'typesafe-actions';
import { FilmUploadRequest } from '../../shared/interfaces/film-upload.interface';

export enum ActionTypes {
	UPLOAD_FILM_REQUEST = 'UPLOAD_FILM_REQUEST',
	UPLOAD_FILM_SUCCESS = 'UPLOAD_FILM_SUCCESS',
	UPLOAD_FILM_FAILED = 'UPLOAD_FILM_FAILED',
};

export const Actions = {
	uploadFilmRequest: (payload: FilmUploadRequest) => action(ActionTypes.UPLOAD_FILM_REQUEST, payload),
	uploadFilmSuccess: () => action(ActionTypes.UPLOAD_FILM_SUCCESS),
	uploadFilmFailed: (payload: { message: string }) => action(ActionTypes.UPLOAD_FILM_FAILED, payload),
};

export type ActionTypeUnion = ActionType<typeof Actions>;