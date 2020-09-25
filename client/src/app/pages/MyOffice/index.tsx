import React from 'react';

import styles from './style.module.scss';
import Categorie from './components/Categorie';

const MyOffice: React.FC = () => {
	return (
		<div className={styles.myOfficeContainer}>
			<Categorie title='Мои фильмы' />
			<Categorie title='Мои лайки' />
		</div>
	)
}

export default MyOffice;