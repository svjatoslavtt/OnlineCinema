import { History } from 'history';

export type BookUploadType = {
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
	salePrice?: number;
	saleProcent?: number;
	date: number;
	file: string;
};

export type BookData = {
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
	salePrice?: number;
	saleProcent?: number;
};

export type BookUploadRequest = {
	formData: FormData;
	history: History;
}