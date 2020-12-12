import { createSelector } from "reselect";

import { UserProfileTypes } from "./reducer";

import { RootState } from "../store";

const getUserProfile = (state: RootState) => state.userProfile;

export const getUserProfileData = createSelector(
	getUserProfile,
	(state: UserProfileTypes) => state.user
);

export const getUserProfileBooks = createSelector(
	getUserProfile,
	(state: UserProfileTypes) => state.books
);

export const getUserProfileLikes = createSelector(
	getUserProfile,
	(state: UserProfileTypes) => state.likes
);