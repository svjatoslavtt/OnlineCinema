import React from 'react';
import { useParams } from 'react-router-dom';

import UploadBook from '../UploadBook';

const EditFilm: React.FC = () => {
	const { filmId }: { filmId: string } = useParams();

	return (
		<UploadBook filmId={filmId} />
	);
};

export default EditFilm;