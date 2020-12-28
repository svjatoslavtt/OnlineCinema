import React from 'react';

import styles from './style.module.scss';

import BookTypeTable from '../BookItem/BookTypeTable';
import BookTypeList from '../BookItem/BookTypeList';
import BookCart from '../BookItem/BookCart';

export enum ProductDisplayTypeEnum {
	LIST = 'list',
	TABLE = 'table',
};

type Products = {
	productDisplayType?: ProductDisplayTypeEnum;
	data: any;
	bigGrid?: boolean;
	cart?: boolean;
};

const Products: React.FC<Products> = ({ productDisplayType, data, bigGrid, cart }) => {
	const table = productDisplayType === ProductDisplayTypeEnum.TABLE;

	return (
		<>
			{
				cart ? (
					<div className={styles.productsOfListWrapper}>
						{data && data.length && data.map(({ id, sale, image, name, description, year, author, price, unsalePrice, badge }: any) => (
							<BookCart 
								key={id}
								sale={sale}
								image={image}
								name={name}
								year={year}
								author={author}
								description={description}
								price={price}
								unsalePrice={unsalePrice}
								badge={badge}
							/>
						))}
					</div>
				) :
				table ? (
					<div className={styles.productsOfTableWrapper}>
						{data && data.length && data.map(({ id, sale, image, name, price, unsalePrice, badge }: any) => (
							<BookTypeTable 
								key={id}
								sale={sale}
								image={image}
								name={name}
								price={price}
								unsalePrice={unsalePrice}
								bigGrid={bigGrid}
								badge={badge}
							/>
						))}
					</div>
				) : (
					<div className={styles.productsOfListWrapper}>
						{data && data.length && data.map(({ id, sale, image, name, description, year, author, price, unsalePrice, badge }: any) => (
							<BookTypeList 
								key={id}
								sale={sale}
								image={image}
								name={name}
								year={year}
								author={author}
								description={description}
								price={price}
								unsalePrice={unsalePrice}
								badge={badge}
							/>
						))}
					</div>
				)
			}
		</>
	);
};

export default Products;