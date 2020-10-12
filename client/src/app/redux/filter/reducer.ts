import { ActionTypes, ActionTypesUnion } from "./actions";

import { filmsInitialState } from "../films/reducer";

export type FilterTypes = {
	filterIsOpen: boolean;
	directors: any;
	filterFilms: any;
	tags: string[] | null;
};

export const filterInitialState: FilterTypes = {
	filterIsOpen: false,
	directors: null,
	filterFilms: null,
	tags: null,
};

export const reducer = (state = filmsInitialState, action: ActionTypesUnion) => {
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
				filterFilms: action.payload.filter,
				tags: action.payload.tags,
			}	
		case ActionTypes.RESET_FILTER:
			return {
				...state,
				filterFilms: null,
				tags: null,
			}	
		default: return state;	
	};
};