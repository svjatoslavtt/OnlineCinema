import React from 'react';

import styles from './style.module.scss';

import BookTypeTable from '../BookItem/BookTypeTable';
import BookTypeList from '../BookItem/BookTypeList';
import BookCart from '../BookItem/BookCart';
import { Book } from '../../../redux/books/types';

export enum ProductDisplayTypeEnum {
	LIST = 'list',
	TABLE = 'table',
};

type Products = {
	productDisplayType?: ProductDisplayTypeEnum;
	data: Book[] | null;
	bigGrid?: boolean;
	cart?: boolean;
};

const Products: React.FC<Products> = ({ productDisplayType = ProductDisplayTypeEnum.TABLE, data, bigGrid, cart }) => {
	const table = productDisplayType === ProductDisplayTypeEnum.TABLE;

	return (
		<>
			{
				cart ? (
					<div className={styles.productsOfListWrapper}>
						{data && data.length ? data.map(({ _id, sale, file, title, author, price }: any) => (
							<BookCart 
								key={_id}
								sale={sale}
								file={file}
								title={title}
								author={author}
								price={price}
							/>
						)) : null}
					</div>
				) :
				table ? (
					<div className={styles.productsOfTableWrapper}>
						{data && data.length ? data.map(({ _id, file, title, price, discountPrice, discountPercent, isSaved }: any) => (
							<BookTypeTable 
								key={_id}
								id={_id}
								file={file}
								title={title}
								price={price}
								discountPrice={discountPrice}
								discountPercent={discountPercent}
								bigGrid={bigGrid}
								isSaved={isSaved}
							/>
						)) : null}
					</div>
				) : (
					<div className={styles.productsOfListWrapper}>
						{data && data.length ? data.map(({ _id, file, title, description, yearOfPublish, author, price, discountPrice, discountPercent, isSaved }: any) => (
							<BookTypeList 
								key={_id}
								id={_id}
								file={file}
								title={title}
								yearOfPublish={yearOfPublish}
								author={author}
								description={description}
								price={price}
								discountPrice={discountPrice}
								discountPercent={discountPercent}
								isSaved={isSaved}
							/>
						)) : null}
					</div>
				)
			}
		</>
	);
};

export default Products;