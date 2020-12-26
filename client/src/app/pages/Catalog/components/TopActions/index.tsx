import React from 'react';
import { DropdownList } from 'react-widgets'
import { ProductDisplayTypeEnum } from '../../../../shared/components/Products';

import styles from './style.module.scss';

type SortTypes = {
	setBooksType: (type: ProductDisplayTypeEnum) => void;
}

const Sort: React.FC<SortTypes> = ({ setBooksType }) => {
	const sortedBy = ['Новинки', 'По рейтенгу', 'От дешёвых к дорогим', 'От дорогих к дешёвым'];

	const handleSort = (value: string) => {
		console.log(value);
	};
	
	return (
		<div className={styles.topActions}>
			<div className={styles.search}>
				<input type="text" name="serch" placeholder='Поиск книги' />
			</div>

			<div className={styles.contentUpgrade}>
				<div className={styles.contentType}>
					<div className={styles.typeItem} onClick={setBooksType.bind(null, ProductDisplayTypeEnum.TABLE)}>
						<input type="radio" id="type-item-1" name="type-products" value="table" defaultChecked />
						<label htmlFor="type-item-1">
							<i className="fas fa-border-all"></i>
						</label>
					</div>

					<div className={styles.typeItem} onClick={setBooksType.bind(null, ProductDisplayTypeEnum.LIST)}>
						<input type="radio" id="type-item-2" name="type-products" value="list" />
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