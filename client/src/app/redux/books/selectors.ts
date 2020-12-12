import { createSelector } from "reselect";

import { BooksState } from "./types";

import { RootState } from "../store";

const getBooksState = (state: RootState) => state.getBooks;

export const getBooks = createSelector(
	getBooksState,
	(state: BooksState) => state.books
);

export const getMyBooks = createSelector(
	getBooksState,
	(state: BooksState) => state.myBooks
);

export const getMyLikes = createSelector(
	getBooksState,
	(state: BooksState) => state.myLikes
);

export const getCurrentBook = createSelector(
	getBooksState,
	(state: BooksState) => state.currentBook
);

export const getIsLikeBook = createSelector(
	getBooksState,
	(state: BooksState) => state.isLike
);

export const getIsRatedBook = createSelector(
	getBooksState,
	(state: BooksState) => state.isRate
);

export const getPageCount = createSelector(
	getBooksState,
	(state: BooksState) => state.pageCount
);

export const getPagination = createSelector(
	getBooksState,
	(state: BooksState) => state.pagination
);
