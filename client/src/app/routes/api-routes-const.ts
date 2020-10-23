export enum ApiEndPoints {
  LOGIN = '/api/auth/login',
	REGISTER = '/api/auth/register',
	
	GET_FILMS = '/api/film/news-feed',
	GET_MY_FILMS = '/api/film/my-films',
	GET_MY_LIKES_FILMS = '/api/film/my-likes',
	GET_CURRENT_FILM = '/api/film/detailed',
	EDIT_FILM = '/api/film/edit',

	FILM_UPLOAD = '/api/film-upload',

	LIKE_FILM = '/api/likes/like',
	DISLIKE_FILM = '/api/likes/dislike',

	RATE_FILM = '/api/rate',

	USER_PROFILE_FILMS = '/api/user-profile/films',
	USER_PROFILE_LIKES = '/api/user-profile/likes',

	GET_DIRECTORS = '/api/filter/directors',
	FILTER = '/api/filter/filtering',

	PAGINATION = '/api/pagination/page',
	PAGE_COUNT = '/api/pagination/page-count',
};