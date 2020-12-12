export enum ApiEndPoints {
  LOGIN = '/api/auth/login',
	REGISTER = '/api/auth/register',
	
	GET_FILMS = '/api/book/news-feed',
	GET_MY_FILMS = '/api/book/my-books',
	GET_MY_LIKES_FILMS = '/api/book/my-likes',
	GET_CURRENT_FILM = '/api/book/detailed',
	EDIT_FILM = '/api/book/edit',

	FILM_UPLOAD = '/api/book-upload',

	LIKE_FILM = '/api/likes/like',
	DISLIKE_FILM = '/api/likes/dislike',

	RATE_FILM = '/api/rate',

	USER_PROFILE_FILMS = '/api/user-profile/books',
	USER_PROFILE_LIKES = '/api/user-profile/likes',

	GET_DIRECTORS = '/api/filter/directors',
	FILTER = '/api/filter/filtering',

	PAGINATION = '/api/pagination/page',
	PAGE_COUNT = '/api/pagination/page-count',
};