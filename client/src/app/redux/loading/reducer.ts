import { ActionTypes, ActionTypeUnion } from "./actions";

export interface LoadingState {
	loading: boolean;
}

const loadingInitialState: LoadingState = {
	loading: false,
};

export const reducer = (state = loadingInitialState, action: ActionTypeUnion) => {
	switch (action.type) {
		case ActionTypes.LOADING_START: 
			return {
				...state,
				loading: true,
			}
		case ActionTypes.LOADING_STOP:
			return {
				...state,
				loading: false,
			}	
		default: return state
	}
};