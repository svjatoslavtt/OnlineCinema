import React from 'react';

import styles from './style.module.scss';

type BannerTypes = {
	title?: string;
}

const Banner: React.FC<BannerTypes> = ({ title = 'Все книиг в одном месте' }) => {
	return (
		<section className={styles.banner}>
			<div className={styles.bannerWrapper}>
				<div className={styles.title}>{title}</div>
			</div>
		</section>
	);
};

export default Banner;