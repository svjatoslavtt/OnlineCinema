export type BookTypes = {
	image: string;
	title: string;
	averageRating: number;
	id: string;
	owner: string;
	likes: number;
};

export type BookOwnerTypes = {
	id: string;
	name: string;
};

export type UsersSetRating = {
	_id: string;
	rating: number;
	userId: string;
}

export type CurrentBookTypes = {
	title: string;
	description: string;
	image: string;
	director: string;
	averageRating: number;
	likes: number;
	peopleRated: number;
	rating: number;
	owner: BookOwnerTypes;
	ratingUsersId: UsersSetRating[];
	usersId: string[];
	_id: string;
};

export type BooksState = {
	books: BookTypes[] | null;
	myBooks: BookTypes[] | null;
	myLikes: BookTypes[] | null;
	currentBook: CurrentBookTypes | null;
	isLike: boolean;
	isRate: boolean;
	pageCount: number[] | null;
	pagination: any;
};