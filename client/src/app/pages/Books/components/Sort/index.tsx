import React from 'react';
import { DropdownList } from 'react-widgets'

import styles from './style.module.scss';

const Sort: React.FC = () => {
	const sortedBy = ['Новинки', 'По рейтенгу', 'От дешёвых к дорогим', 'От дорогих к дешёвым'];

	const handleSort = (value: string) => {
		console.log(value);
	}
	
	return (
		<div className={styles.headContent}>
			<div className={styles.headContentLeft}>
				<input type="text" name="serch" placeholder='Поиск книги' />
			</div>

			<div className={styles.headContentRight}>
				<div className={styles.contentType}>
					<div className={styles.typeItem}>
						<input type="radio" id="type-item-1" name="type-list" value="table" defaultChecked />
						<label htmlFor="type-item-1">
							<i className="fas fa-border-all"></i>
						</label>
					</div>

					<div className={styles.typeItem}>
						<input type="radio" id="type-item-2" name="type-list" value="list"  />
						<label htmlFor="type-item-2">
							<i className="fas fa-list"></i>
						</label>
					</div>
				</div>

				<div className={styles.sort}>
					<DropdownList
						data={sortedBy}
						defaultValue='Новинки'
						onChange={value => handleSort(value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Sort;