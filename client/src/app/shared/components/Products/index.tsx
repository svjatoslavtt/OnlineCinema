import React from 'react';

import styles from './style.module.scss';

import BookItem from '../BookItem';
import BookTypeList from '../BookTypeList';

export enum ProductDisplayTypeEnum {
	LIST = 'list',
	TABLE = 'table',
};

type Products = {
	productDisplayType: ProductDisplayTypeEnum;
	data: any;
};

const Products: React.FC<Products> = ({ productDisplayType, data }) => {
	const table = productDisplayType === ProductDisplayTypeEnum.TABLE;

	return (
		<>
			{
				table ? (
					<div className={styles.productsOfTableWrapper}>
						{data && data.length && data.map(({ id, sale, image, name, oldPrice, currentPrice }: any) => (
							<BookItem 
								key={id}
								sale={sale}
								image={image}
								name={name}
								oldPrice={oldPrice}
								currentPrice={currentPrice}
							/>
						))}
					</div>
				) : (
					<div className={styles.productsOfListWrapper}>
						{data && data.length && data.map(({ id, sale, image, name, description, year, author, oldPrice, currentPrice }: any) => (
							<BookTypeList 
								key={id}
								sale={sale}
								image={image}
								name={name}
								year={year}
								author={author}
								description={description}
								oldPrice={oldPrice}
								currentPrice={currentPrice}
							/>
						))}
					</div>
				)
			}
		</>
	);
};

export default Products;