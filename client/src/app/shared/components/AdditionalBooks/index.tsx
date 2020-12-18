import React from 'react';

import styles from './style.module.scss';

import Products from '../Products';
import { ProductDisplayTypeEnum } from '../Products';

type AdditionalBooksTypes = {
	data: any;
	title: string;
	count: number;
}

const AdditionalBooks: React.FC<AdditionalBooksTypes> = ({ data, title, count }) => {
	const containerStyles = [
		styles.container,
		count % 2 === 0 ? styles.grey : styles.white,
	];

	return (
		<section className={containerStyles.join(' ')}>
			<div className={styles.content}>
				<div className={styles.title}>{title}</div>

				<Products 
					data={data}
					productDisplayType={ProductDisplayTypeEnum.TABLE}
					bigGrid={true}
				/>
			</div>
		</section>
	);
};

export default AdditionalBooks;