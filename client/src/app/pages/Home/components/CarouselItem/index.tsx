import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './style.module.scss';

type CarouselItemType = {
	title: string,
	titleFill: string,
	subtitle: string,
	itemLink: string,
	image: any,
}

const CarouselItem: React.FC<CarouselItemType> = ({ title, titleFill, subtitle, itemLink, image }) => {
	return (
		<div className={styles.carouselItemsWrapper}>
			<div className={styles.carouselInfoItem}>
				<div className={styles.itemTitle}>
					<span>{title}</span>
					<span className={styles.itemTitleFillout}>{titleFill}</span>
				</div>

				<div className={styles.itemSubtitle}>
					{subtitle}
				</div>

				<div className={styles.itemLink}>
					<NavLink to="/">{itemLink}</NavLink>
				</div>
			</div>
			<img className={styles.carouselImageItem} src={image} alt={`${title} ${titleFill}`} />
		</div>
	)
}

export default CarouselItem;