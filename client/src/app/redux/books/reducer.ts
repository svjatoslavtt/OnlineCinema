import { ActionTypes, ActionTypesUnion } from "./action";
import { BooksState } from "./types";

export const booksInitialState: BooksState = {
	books: null,
	discountBooks: null,
	myLikes: null,
	currentBook: null,
	isSave: false,
	isRate: false,
	pageCount: null,
	pagination: null,
	booksByAuthor: null,
	likeABook: null,
	myBooks: null,
};

export const reducer = (state = booksInitialState, action: ActionTypesUnion) => {
	console.log(action);
	
	switch (action.type) {
		case ActionTypes.GET_BOOKS_SUCCESS: 
			return {
				...state,
				books: [...action.payload.books],
			}
		case ActionTypes.GET_DISCOUNT_BOOKS_SUCCESS: 
			return {
				...state,
				discountBooks: [...action.payload.discountBooks],
			}
		case ActionTypes.GET_MY_BOOKS_SUCCESS:
			return {
				...state,
				myBooks: [...action.payload.books],
			}	
		case ActionTypes.GET_MY_LIKES_SUCCESS:
			return {
				...state,
				myLikes: [...action.payload.books],
			}	
		case ActionTypes.GET_CURRENT_BOOK_SUCCESS:
			return {
				...state,
				currentBook: action.payload.currentBook,
				isSave: action.payload.isLike,
				isRate: action.payload.isRate,
				booksByAuthor: action.payload.booksByAuthor,
				likeABook: action.payload.likeABook,
			}
		case ActionTypes.RATE_BOOK_SUCCESS:
			return {
				...state,
				currentBook: {
					...state.currentBook,
					...action.payload.rating,
				},
				isRate: action.payload.isRate,
			}
		case ActionTypes.GET_CURRENT_PAGE_SUCCESS:
			return {
				...state,
				books: action.payload.books,
				pagination: action.payload.pagination,
			}
		case ActionTypes.UPLOAD_PAGE: 
			return {
				...state,
				currentBook: null,
			}	
		default: return state;	
	}
};