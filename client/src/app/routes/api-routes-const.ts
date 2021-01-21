export enum ApiEndPoints {
  LOGIN = '/api/auth/login',
	REGISTER = '/api/auth/register',

	GET_DISCOUNT_BOOKS = '/api/book/discount-books',
	
	GET_FILMS = '/api/book/books',
	GET_MY_FILMS = '/api/book/my-books',
	GET_MY_LIKES_FILMS = '/api/book/my-likes',
	GET_CURRENT_FILM = '/api/book/detailed',
	EDIT_FILM = '/api/book/edit',

	FILM_UPLOAD = '/api/book-upload',

	SAVE_BOOK = '/api/action/save',
	REMOVE_SAVED_BOOK = '/api/action/remove-saved',

	RATE_FILM = '/api/rate',

	USER_PROFILE_FILMS = '/api/user-profile/books',
	USER_PROFILE_LIKES = '/api/user-profile/likes',

	GET_DIRECTORS = '/api/filter/directors',
	FILTER = '/api/filter/filtering',

	PAGINATION = '/api/pagination/page',
	PAGE_COUNT = '/api/pagination/page-count',
};