import { History } from 'history';

export interface FilmUpload {
	image: string | null | ArrayBuffer;
	title: string;
	description: string;
	likes: number;
	rating: number | null;
	userId: string;
};

export type FilmUploadOmit = Omit<FilmUpload, 'likes'>;

export interface FilmUploadRequest {
	film: FilmUploadOmit;
	history: History;
}