import {ActionTypes, ActionTypeUnion} from "./actions";

export interface FilmUploadInterface {
	error: string;
};

const filmUploadInitialState: FilmUploadInterface = {
	error: '',
};

export const reducer = (state = filmUploadInitialState, action: ActionTypeUnion) => {
	switch (action.type) {
		case ActionTypes.UPLOAD_FILM_REQUEST:
			return {
				...state,
			}
		case ActionTypes.UPLOAD_FILM_SUCCESS:
			return {
				...state,
			}	
		case ActionTypes.UPLOAD_FILM_FAILED:
			return {
				...state,
				error: action.payload.message,
			}	
		default: return state
	}
}