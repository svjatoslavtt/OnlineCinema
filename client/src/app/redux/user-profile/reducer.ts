import { FilmTypes } from "../films/types";
import { ActionTypes, ActionTypesUnion } from "./actions";

export type UserProfileTypes = {
	films: FilmTypes[] | null;
	likes: FilmTypes[] | null;
	user: { name: string } | null;
};

export const userProfileInitialState: UserProfileTypes = {
	films: null,
	likes: null,
	user: null,
};

export const reducer = (state = userProfileInitialState, action: ActionTypesUnion) => {
	switch (action.type) {
		case ActionTypes.USER_PROFILE_FILMS_SUCCESS:
			return {
				...state,
				films: [...action.payload.films],
				user: action.payload.user,
			};
		case ActionTypes.USER_PROFILE_LIKES_SUCCESS: 
			return {
				...state,
				likes: [...action.payload.films],
			};
		default: return state;	
	};
};