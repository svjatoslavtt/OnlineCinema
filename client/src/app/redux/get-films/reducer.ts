import { ActionTypes, ActionTypesUnion } from "./action";

type Film = {
	image: string;
	title: string;
	rating: number;
	id: string;
};

export type FilmsState = {
	films: Film[] | null;
};

export const filmsInitialState: FilmsState = {
	films: null,
};

export const reducer = (state = filmsInitialState, action: ActionTypesUnion) => {
	console.log(action);
	switch (action.type) {
		case ActionTypes.GET_FILMS_SUCCESS: 
			return {
				...state,
				films: [...action.payload.films],
			}
		default: return state;	
	}
};