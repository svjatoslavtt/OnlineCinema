import React from 'react';
import { useParams } from 'react-router-dom';

import UploadBook from '../MyOffice/UploadBook';

const EditBook: React.FC = () => {
	const { bookId }: { bookId: string } = useParams();

	return (
		<UploadBook bookId={bookId} />
	);
};

export default EditBook;