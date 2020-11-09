import {ActionTypes, ActionTypeUnion} from "./actions";

export interface FilmUploadState {
	error: string;
};

const filmUploadInitialState: FilmUploadState = {
	error: '',
};

export const reducer = (state = filmUploadInitialState, action: ActionTypeUnion) => {
	switch (action.type) {
		case ActionTypes.UPLOAD_FILM_FAILED:
			return {
				...state,
				error: action.payload.message,
			}	
		default: return state
	}
}