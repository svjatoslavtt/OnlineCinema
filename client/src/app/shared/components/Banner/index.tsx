import React from 'react';

import styles from './style.module.scss';

type BannerTypes = {
	title?: string;
	subtitle?: string;
}

const Banner: React.FC<BannerTypes> = ({ subtitle, title = 'Все книги в одном месте' }) => {
	return (
		<section className={styles.banner}>
			<div className={styles.container}>
				<div className={styles.title}>{title}</div>
				<div className={styles.subtitle}>{subtitle}</div>
			</div>
		</section>
	);
};

export default Banner;