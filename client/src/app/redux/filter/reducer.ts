import { ActionTypes, ActionTypesUnion } from "./actions";

import { booksInitialState } from "../books/reducer";

export type FilterTypes = {
	filterIsOpen: boolean;
	directors: any;
	filterBooks: any;
	tags: string[] | null;
};

export const filterInitialState: FilterTypes = {
	filterIsOpen: false,
	directors: null,
	filterBooks: null,
	tags: null,
};

export const reducer = (state = booksInitialState, action: ActionTypesUnion) => {
	switch (action.type) {
		case ActionTypes.OPEN_FILTER: 
			return {
				...state,
				filterIsOpen: true,
			};
		case ActionTypes.CLOSE_FILTER:
			return {
				...state,
				filterIsOpen: false,
			}	
		case ActionTypes.GET_DIRECTORS_SUCCESS:
			return {
				...state,
				directors: action.payload.directors,
			}	
		case ActionTypes.FILTER_SUCCESS:
			return {
				...state,
				filterBooks: action.payload.filter,
				tags: action.payload.tags,
				filterIsOpen: false,
			}	
		case ActionTypes.RESET_FILTER:
			return {
				...state,
				filterBooks: null,
				tags: null,
			}	
		default: return state;
	};
};