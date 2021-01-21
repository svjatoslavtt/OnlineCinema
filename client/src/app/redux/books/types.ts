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

export type CurrentBookTypes = {
	_id: string;
	averageRating: number;
	peopleRated: number;
	rating: number;
	title: string;
	description: string;
	author: string;
	genre: string;
	publishingHouse?: string;
	isbn: string;
	article: string;
	age: number;
	yearOfPublish: number;
	binding: string;
	pages: number;
	format: string;
	weight: number;
	price: number;
	discountPrice?: number;
	discountPercent?: number;
	date: number;
	file: string;
	countOfRated: number;
	booksByAuthor: Book[];
	likeABook: Book[];
};

export type Book = Omit<CurrentBookTypes, 'countOfRated'>;

export type BooksState = {
	books: Book[] | null;
	discountBooks: Book[] | null;
	myBooks: BookTypes[] | null;
	booksByAuthor: Book[] | null;
	likeABook: Book[] | null;
	myLikes: BookTypes[] | null;
	currentBook: CurrentBookTypes | null;
	isSave: boolean;
	isRate: boolean;
	pageCount: number[] | null;
	pagination: any;
};