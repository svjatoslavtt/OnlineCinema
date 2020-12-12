import { BookTypes } from "../books/types";
import { ActionTypes, ActionTypesUnion } from "./actions";

export type UserProfileTypes = {
	books: BookTypes[] | null;
	likes: BookTypes[] | null;
	user: { name: string, id: string } | null;
};

export const userProfileInitialState: UserProfileTypes = {
	books: null,
	likes: null,
	user: null,
};

export const reducer = (state = userProfileInitialState, action: ActionTypesUnion) => {
	switch (action.type) {
		case ActionTypes.USER_PROFILE_FILMS_SUCCESS:
			return {
				...state,
				books: [...action.payload.books],
				user: action.payload.user,
			};
		case ActionTypes.USER_PROFILE_LIKES_SUCCESS: 
			return {
				...state,
				likes: [...action.payload.books],
			};
		default: return state;	
	};
};