import {ActionTypes, ActionTypeUnion} from "./actions";

export interface BookUploadState {
	error: string;
};

const bookUploadInitialState: BookUploadState = {
	error: '',
};

export const reducer = (state = bookUploadInitialState, action: ActionTypeUnion) => {
	switch (action.type) {
		case ActionTypes.UPLOAD_FILM_FAILED:
			return {
				...state,
				error: action.payload.message,
			}	
		default: return state
	}
}