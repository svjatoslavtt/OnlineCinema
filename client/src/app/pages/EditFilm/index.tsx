import React from 'react';
import { useParams } from 'react-router-dom';

import UploadFilm from '../UploadFilm';

const EditFilm: React.FC = () => {
	const { filmId }: { filmId: string } = useParams();

	return (
		<UploadFilm filmId={filmId} />
	);
};

export default EditFilm;