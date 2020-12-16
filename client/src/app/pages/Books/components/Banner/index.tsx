import React from 'react';

import styles from './style.module.scss';

const Banner: React.FC = () => {
	return (
		<section className={styles.banner}>
			<div className={styles.bannerWrapper}>
				<div className={styles.title}>Книги</div>
			</div>
		</section>
	);
};

export default Banner;